var App = {

    data: {
        name: "",
        nameKana: "",
        last_week_tasks: [],
        this_week_tasks: []
    },

    utils: {
        list_parent_prefix: "&bull;&nbsp;",
        list_child_prefix: "&nbsp;&nbsp;&nbsp;&nbsp;&#9702;&nbsp;",
        weekDays: ["日", "月", "火", "水", "木", "金", "土"]
    },

    getName: function() {
        return `氏名 ${this.data.name} (${this.data.nameKana})`
    },

    getDate: function(days, operation = 1) {
        var today = new Date()
        var date = new Date(today)
        if (operation == 1) date.setDate(today.getDate() + days)
        else date.setDate(today.getDate() - days)
        var month = date.getMonth() + 1
        var monthDay = date.getDate()
        var weekDay = date.getDay()
        return `${month}月 ${monthDay}日（${this.utils.weekDays[weekDay]}）`
    },

    getFirstDateString: function() {
        var dateOne = this.getDate(7, 0)
        var dateTwo = this.getDate(3, 0)
        return `=====【先週おこなったこと】${dateOne}～ ${dateTwo} =====`
    },

    getSecondDateString: function() {
        var dateOne = this.getDate(0, 1)
        var dateTwo = this.getDate(5, 1)
        return `=====【今週おこなうこと】${dateOne}～ ${dateTwo} =====`
    },

    deleteLastWeekTast: function(index) {
        this.data.last_week_tasks.splice(index, 1)
        this.refreshLastWeekTasks()
    },

    refreshLastWeekTasks: function() {
        $("#last_week_tasks").empty();
        $("#widlw_input").val("")

        for (i = 0; i < this.data.last_week_tasks.length; i++) {
            var btn = `<button class='btn btn-sm btn-outline-danger float-right btn-delete' data-id='${i}'>Delete</button>`
            $("#last_week_tasks").append(`<ul class='list-group-item py-2'>${this.data.last_week_tasks[i]}${btn}</ul>`);
        }
        this.refresh()
    },

    deleteThisWeekTast: function(index) {
        this.data.this_week_tasks.splice(index, 1)
        this.refreshThisWeekTasks()
    },

    refreshThisWeekTasks: function() {
        $("#this_week_tasks").empty();
        $("#wiwdtw_input").val("")

        for (i = 0; i < this.data.this_week_tasks.length; i++) {
            var btn = `<button class='btn btn-sm btn-outline-danger float-right btn-delete' data-id='${i}'>Delete</button>`
            $("#this_week_tasks").append(`<ul class='list-group-item py-2'>${this.data.this_week_tasks[i]}${btn}</ul>`);
        }
        this.refresh()
    },

    refresh: function() {
        $("#result").empty()
        
        var nameString = this.getName()
        var firstDateString = this.getFirstDateString()
        var secondDateString = this.getSecondDateString()
        var result = `${nameString}\n\n${firstDateString}\n\n`

        for (i = 0; i < this.data.last_week_tasks.length; i++) {
            result = result + this.data.last_week_tasks[i] + "\n"
        }

        result = `${result}\n${secondDateString}\n\n`

        for (i = 0; i < this.data.this_week_tasks.length; i++) {
            result = result + this.data.this_week_tasks[i] + "\n"
        }

        $("#result").empty()
        $("#result").html(result)
    },

    init: function() {
        wanakana.bind(document.getElementById("name_kana"), {IMEMode: "toKatakana"})

        $("#name").on("input", function(){
            App.data.name = $(this).val()
            App.refresh()
        })
        $("#name_kana").on("input", function(){
            App.data.nameKana = $(this).val()
            App.refresh()
        })
        
        $("#widlw_button_add_item_parent").on("click", function() {
            var data = $("#widlw_input").val()
            if (data) {
                App.data.last_week_tasks.push(App.utils.list_parent_prefix + data)
                App.refreshLastWeekTasks()
            }
        })

        $("#widlw_button_add_item_child").on("click", function() {
            var data = $("#widlw_input").val()
            if (data) {
                App.data.last_week_tasks.push(App.utils.list_child_prefix + data)
                App.refreshLastWeekTasks()
            }
        })

        $("#last_week_tasks").on("click", ".btn-delete", function() {
            App.deleteLastWeekTast($(this).data("id"))
        })

        $("#wiwdtw_button_add_item_parent").on("click", function() {
            var data = $("#wiwdtw_input").val()
            if (data) {
                App.data.this_week_tasks.push(App.utils.list_parent_prefix + data)
                App.refreshThisWeekTasks()
            }
        })

        $("#wiwdtw_button_add_item_child").on("click", function() {
            var data = $("#wiwdtw_input").val()
            if (data) {
                App.data.this_week_tasks.push(App.utils.list_child_prefix + data)
                App.refreshThisWeekTasks()
            }
        })

        $("#this_week_tasks").on("click", ".btn-delete", function() {
            App.deleteThisWeekTast($(this).data("id"))
        })
        
        $("#copy").click(function(){
            $("#result").select();
            document.execCommand('copy');
        });

        $(function () {
            $('[data-toggle="tooltip"]').tooltip({trigger: "click"})
        })
    }
}

$(document).ready(function(){
    App.init()
})