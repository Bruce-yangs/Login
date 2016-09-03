define([], function() {
	return {
		getAccounInfo: function(data, callback) {
			var data = data || {
				wechat_id: "123",
				balance: 30,
				phoneNum: 15810211325,
				idCard: '410881199107171514'
			};
			$.ajax({
				url: "../data/getValidCode.json",
				type: "get",
				data: data,
				beforeSend: function() {

				},
				success: function(data) {
					callback(data)
				},
				complete: function(data) {
					console.log(data)
				}
			})
		},
        getVerifyCode:function(data,callback){
            $.when(
                $.ajax({
                    url:'../data/getValidCode.json',
                    data:data
                }),
                $.ajax('../data/order.json')
            )
            .done(function(data){
                callback(data);
            })
            .fail(function(err){
                console.log(err)
            })
        },
        getNumber:function(data,callback){
            $.when($.ajax('../data/numList.json'))
            .done(function(data){
                callback(data);
            })
            .fail(function(err){
                console.log(err);
            })
        }
	}
})