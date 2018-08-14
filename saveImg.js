var longTouch = false;

Page({
	data:{
		img:{},
		results:[],
		video:null,
		hidden:false,
		display:"none",
		previewImage:"none",
		saveImage:true,
	},

	previewImg:function(){
		this.setData({
			previewImage:"block"
		});
	},
	saveImg:function(){
		longTouch = true;
		this.setData({
			saveImage:false
		})
	},
	closePrev:function(){
		if(longTouch){
			longTouch = false;
		}else{
			this.setData({
				previewImage:"none"
			});
		}
	},
	actionSheetChange:function(){
		this.setData({
			saveImage:!this.data.saveImage
		})
	},
	downloadFile:function(e){
		var imgUrl = e.currentTarget.dataset.imageHref;
		var that = this;
		wx.downloadFile({
  			url: imgUrl,
  			type: 'image',
  			success:function(res){
  				var tempFilePath = res.tempFilePath;
    			console.log(tempFilePath);
    			wx.saveFile({
      				tempFilePath:tempFilePath,
      				success:function(res){
        				var savedFilePath = res.savedFilePath;
        				console.log(savedFilePath);
        				that.setData({
        					saveImage:true
        				});
      				},
      				fail:function(res){
      					console.log(res);
      				}
    			});
  			},
  			fail:function(res){
  				console.log(res);
  			}
		});
	}
});