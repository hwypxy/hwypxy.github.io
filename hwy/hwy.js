$(function() {
    var obj = {
        doThing: [{
            content: "我的大刀早已饥渴难耐"
        }, {
            content: "敌军还有三分钟到达战场"
        }, {
            content: "没有撤退可言"
        }]
    }

    objEach();
    //遍历数组添加数据
    function objEach() {
        $('.todo-main').empty();
        $.each(obj.doThing, function(index, item) {
            $(".todo-main").append(`
                <li class="todo-list">
                    <label>
                        <input type="checkbox">
                        <span>${item.content}</span>
                    </label>
                    <button class="btn btn-danger">删除</button>
                </li>
            `);
        });
    }

    task();
    //任务的数量
    function task() {
        $('#allTodos').text(obj.doThing.length);
    }

    checkBox();
    // 单选框按钮事件
    function checkBox() {
        $('.todo-list input').click(function() {
            checkedAllToggle();
            checkedSum();
        });
    }

    // 单选框选中的数量
    function checkedSum() {
        $("#allComplateTodos").text($('.todo-list input:checked').length);
    }

    checkedAll();
    // 全选按钮
    function checkedAll() {
        $("#checkAll").click(function() {
            if ($("#checkAll:checked").length) {
                $('.todo-list input').prop("checked", true);
                checkedSum();
            } else {
                $('.todo-list input').prop("checked", false);
                checkedSum();
            }
            checkedAllToggle();
        });
    }

    function checkedAllToggle() {
        if ($(".todo-list input:checked").length < $(".todo-list").length) {
            $("#checkAll").prop("checked", false);
        } else {
            $("#checkAll").prop("checked", true);
        }

        if (!$(".todo-list").length) {
            $("#checkAll").prop("checked", false);
        }
    }

    del();
    //单个删除按钮
    function del() {
        $(".todo-list>button").click(function() {
            $(this).parent().slideUp(1000, function() {
                obj.doThing.splice($(this).index(), 1);
                $(this).remove();
                task();
                checkedSum();
                checkedAll();
                checkedAllToggle();
            });
        });
    }

    delAll();
    //全删按钮
    function delAll() {
        $("#removeAllComplate").click(function() {
            if ($(".todo-list input:checked").length) {
                $(".todo-list input:checked").parent().parent().slideUp(1000, function() {
                    obj.doThing.splice($(this).index(), 1);
                    $(this).remove();
                    task();
                    checkedSum();
                    checkedAllToggle();
                    // checkedAll();
                });
            }
        });
    }

    //已存在内容提示
    function objVal(_this) {
        $.each(obj.doThing, function(index, item) {
            if (_this.val() == item.content) {
                var num = index + 1;
                alert('你输入的内容已经存在，在第' + num + '项！');
                _this.val('');
                _this.attr("name", 0);
            }
        });
    }

    //输入框
    $('#newTodo').keyup(function(e) {
        //Enter键按下时
        if (e.keyCode == 13) {
            objVal($(this));
            // 内容不为空
            if ($(this).val().trim()) {
                obj.doThing.unshift({
                    content: $(this).val()
                });
                $(this).val('');
                if (!$(this).val()) {
                    alert('提交成功!');
                }
                objEach();
                checkBox();
                task();
                checkedSum();
                checkedAllToggle();
                del();
            } else if (!$(this).attr("name")) {
                alert('内容不能为空，请重新输入！');
            }
            $(this).removeAttr("name");
        }
    });


});