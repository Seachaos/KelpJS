/*
The MIT License (MIT)

Copyright (c) 2015 Seachaos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var kelp = {
	overWindowHeight : false,
	overBannerHeight : false,
	detectorDOM : false,
	banner_kelp : false,
	banner_top : false,
	win : $(window)
};
kelp.eat = kelp.at = kelp.bind = kelp.with = kelp.find = function(dom){
	this.detectorDOM = dom;
	return this;
}
kelp.grow = function(dom){
	this.banner_kelp = dom;
	return this;
}
kelp.baseOn = kelp.base = kelp.on = kelp.ref = function(dom){
	if(typeof(dom)=="number"){
		return this.overBanner(dom);
	}
	this.banner_top = dom;
	return this;
}
kelp.over = kelp.overBanner = function(height){
	this.overBannerHeight = height;
	return this;
}

kelp.overWindow = function(height){
	this.overWindowHeight = height;
	return this;
}

kelp._scrollAction_detection_dom = function(){
	var dom = this.detectorDOM;
	var offset = dom.offset().top - (this.win.scrollTop() + this.win.height());
	return offset;
}
kelp._scrollAction_detection_height = function (){
	var offset = this.win.height() - this.win.scrollTop();
	offset += this.overWindowHeight;
	return offset;
}
kelp._scrollAction_detection_banner = function (){
	var banner_top = this.banner_top;
	var offset = banner_top.offset().top + banner_top.outerHeight() - this.win.scrollTop();
	offset += this.overBannerHeight;
	return offset;
}
kelp.scrollAction = function(){
	if(kelp.banner_kelp===false){
		return;
	}
	var offset = 0;
	if(kelp.overBannerHeight!==false){
		offset = kelp._scrollAction_detection_banner();
	}else if(kelp.overWindowHeight!==false){
		offset = kelp._scrollAction_detection_height();
	}else if(kelp.detectorDOM!==false){
		offset = kelp._scrollAction_detection_dom();
	}else{
		return;
	}
	var banner_kelp = kelp.banner_kelp;
	if(offset<=0){
		banner_kelp.fadeIn();
	}else{
		banner_kelp.fadeOut();
	}
}

kelp.up = kelp.run = kelp.ok = function(dom){
	if(dom){
		this.grow(dom);
	}
	var banner_kelp = kelp.banner_kelp;
	banner_kelp.css('position','fixed');
	banner_kelp.css('top','0px');
	banner_kelp.width(this.banner_top.width());
	$(document).scroll(this.scrollAction);
	return this;
}