/*

Copyright (c) 2012, Stephen Woods
All rights reserved. (BSD License)

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

Ascii = (function(){
	
	DEFAULT_CHAR_MAP = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~i!lI;:,\"^`'. ";
	
	var AsciiArt = function(config){
		
		if(config.color && config.color == true){
			this.color = true
		}else{
			this.color = false;
		}
		
		this.charMap = config.charMap || DEFAULT_CHAR_MAP;
		
	}
	
	AsciiArt.prototype.makeAscii = function(url, callback){
		var map = this.charMap;

		// map = '';
		var grays = map.length;
		console.log(grays);

		var canvas = document.createElement('canvas'),
		    ctx = canvas.getContext('2d'),
		    that = this,
		    thisRow,
		    out = [],
		    img = new Image(),
		
		    that = this;
		
		
		canvas.height=480;
		canvas.width=640;
		img.onload = function(){
			console.time('calc');
			ctx.drawImage(img, 0,0, img.width, img.height * .6);

			var data = ctx.getImageData(0,0, img.width, img.height * .6),
			
			i, avg, color, ch;

			for(var y = 0; y < data.height; y++){
				thisRow = [];
				for(var x = 0; x < data.width; x++){
					i = (y * 4) * data.width + x * 4;
					avg = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
					color = [data.data[i], data.data[i + 1], data.data[i + 2]];

					
					ch = map[Math.round((avg/255) *grays)];
					// if(Math.round((avg/255) *grays) == 255){
					// 	ch = ' ';
					// }
					
					if(!ch){
						ch = map[map.length-1];
					}
					if(ch == ' '){
						ch = '&nbsp;';
					}
					if(that.color){
						thisRow.push("<span style=\"color:rgb(" + color.join(',') + ")\">" + ch + "</span>");
					}else{
						thisRow.push("<span>" + ch + "</span>");
					}
					
					

					
				}	
				thisRow.push('<br>');
				out.push(thisRow);
			}
			ctx.putImageData(data, 0, 0);
			
			var outStr = '';

			var len = out.length;
			for (var i=0; i < len; i++) {
				outStr += out[i].join('');
				outStr += '\n';
			};
			console.timeEnd('calc');
			callback(outStr);
		}

		img.src = url;
		
	}
	
	
	return AsciiArt;
	
	
	
}());