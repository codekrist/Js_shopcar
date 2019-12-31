(function () {

    var sub = document.getElementsByClassName('td-sub');
    var add = document.getElementsByClassName('td-add');
    // 手动修改数量
    var sdInpt = document.getElementsByClassName('inpt ');
    // 获取 所有行的商品信息列表
    var itemContent = document.getElementsByClassName('item-content');
    // 获取所有单选框
    var choose = document.getElementsByClassName('choose');
    // 获取到全选
    var inpt1 = document.querySelectorAll('.inpt1');
    // 获取删除属性
    var btnDelea = document.getElementsByClassName('a');
    // 删除选中指定商品
    var deLete = document.getElementsByClassName('delete')[0]
    console.log(btnDelea)
    // 加
    for (var i = 0; i < add.length; i++) {
        add[i].onclick = function () {
            numChange(this, 'add') //this指向当前被点击的dom节点
        }
    }
    // 减
    for (var i = 0; i < sub.length; i++) {
        sub[i].onclick = function () {
            numChange(this, 'sub') //this指向当前被点击的dom节点

        }
    }
    //手动修改数量
    for (var i = 0; i < sdInpt.length; i++) {
        sdInpt[i].onblur = function () {

            if (this.value < 1) {
                this.value = 1
            }
            this.value = parseInt(this.value) //保证数量时正数
            numChange(this, 'cursor')
        }
    }

    //单选框
    for (var i = 0; i < choose.length; i++) {
        choose[i].onclick = function () {
            // console.log('choose')
            getTotal()
        }
    }
    // 全选单选按钮
    for (var i = 0; i < inpt1.length; i++) {
        inpt1[i].onclick = function () {
            for (var i = 0; i < itemContent.length; i++) {
                var check = itemContent[i].querySelector('.choose');

                check.checked = this.checked
            }
            inpt1[0].checked = inpt1[1].checked = this.checked;
            getTotal()
        }
    }
    // 删除当前行
    for (var i = 0; i < btnDelea.length; i++) {
        btnDelea[i].onclick = function () {
            // console.log(2)
            var tr = this.parentNode.parentNode;
            tr.parentNode.removeChild(tr)
            //重新计算商品总价
            getTotal()
        }
    }
    // 删除被选中的上哦怕
    deLete.onclick = function () {
        var itemContent = document.getElementsByClassName('item-content');
        for (var i = 0; i < itemContent.length; i++) {
            var check = itemContent[i].querySelector('.choose');
            if (check.checked) {
                // 选中
                itemContent[i].parentNode.removeChild(itemContent[i])
            }
        }
        getTotal()
    }
    // 总计功能
    function getTotal() {
        //设置总价
        var total = 0;
        // 总个数
        var allNum = 0
        for (var i = 0; i < itemContent.length; i++) {
            // 获取到里面每行的复选框
            var check = itemContent[i].querySelector('.choose');
            var inpt = itemContent[i].querySelector('.inpt').value;
            // console.log(inpt)
            // console.log(check)
            if (check.checked) {
                // console.log(itemContent[i])
                // 获取到单价
                // 获取到价格
                var tdSum = itemContent[i].querySelector('.td-sum ');
                var toTot = tdSum.querySelector('.td-inner').innerHTML;
                console.log(toTot) //现在时字符串 
                smTotal = Number(toTot); //使用Number 方法 改为数字
                // console.log(smTotal)
                total = total + smTotal;
                inpt = Number(inpt);
                allNum = allNum + inpt
            }

        }
        // console.log(allNum);
        //放置到结算

        var a1 = document.querySelector('.text');
        var nss = document.querySelector('.nss');
        // console.log(a1.innerHTML)
        a1.innerHTML = total.toFixed(2);
        nss.innerHTML = allNum
        //判断是否全选
        var isAllCheck = true
        for (var i = 0; i < itemContent.length; i++) {
            var check = itemContent[i].querySelector('.choose');
            if (!check.checked) { //有没有被选中的
                isAllCheck = false;
                break; //终止循环
            }
        }
        if (!itemContent.length) {
            isAllCheck = false
        }
        // console.log(isAllCheck)
        inpt1[0].checked = inpt1[1].checked = isAllCheck;
        //计算商品数量

    }
    getTotal()
    /***
     * 封装添加 减少 商品数量
     *  数量变化函数
     * @param {Object} dom dom 被点击的那个Dom节点
     * @param {String} act act 数量添加还是减少
     * @param {Number} num num 数量添加还是减少
     */
    function numChange(dom, act) {
        //1- 找到父标签
        // console.log(this.parentNode)
        var tdInner = dom.parentNode;
        // 2- 找到input数量框
        var inpt = tdInner.getElementsByClassName('inpt')[0];
        //3- 获取数量
        var num = inpt.value;
        if (act == 'add') {
            // 添加
            num++;
            inpt.value = num;
        } else if (act == 'sub') {
            //减少
            num--;
            if (num == 0) {
                num = 1
            }
            inpt.value = num;
        } else if (act == 'cursor') {
            inpt.value = num;
        } else {
            // 非法行为
            return
        }
        //4- 找到小计所在的父元素
        var tr = tdInner.parentNode.parentNode;
        // console.log(tr)
        //5-   根据父元素找到 小计获取到单价
        var Dprice = tr.getElementsByClassName('td-price')[0];
        //6- 根据ul中的父元素找到 总价中的父元素
        var tdSum = tr.getElementsByClassName('td-sum')[0];
        //7- 总价中的父元素中的总价
        var Zprice = tdSum.getElementsByClassName('td-inner')[0]
        // console.log(Dprice.innerHTML)
        //8- 设置小计变量
        var price = Dprice.innerHTML
        // console.log(price)
        //9 -小计的价格 =  数量* 单价格
        var smTotal = (num * price)
        // console.log(smTotal)
        // return
        //10-设置保留两位
        smTotal = smTotal.toFixed(2);
        // console.log(smTotal)
        //11- 将价格小计放入到总价
        Zprice.innerHTML = smTotal
        //12- 这一行被选中 获取标签
        var Choose = tr.getElementsByClassName('td-chk')[0];
        //13- 获取全选按钮
        var inpts = Choose.getElementsByTagName('input')[0]
        // 13- 点击 + 多选框 默认为true
        inpts.checked = true;
        getTotal()
    }

})()