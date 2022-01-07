var stage;

var colorList = [
	'#DC143C',//'crimson',
	'#32CD32',//'limegreen',
	'#FF69B4',//'hotpink',
	'#00BFFF',//'deepskyblue',
	'#50C878', //emerald
	'#D2691E',//'chocolate'
	// '#FFFF00' //Yellow'
	'#FFD700'
];

/* points downwards */
class Starlet extends createjs.Shape {

	static w = 30;
	static h1 = 10;
	static h = 50;

	

	constructor(x,y,rotation,color) {
		super();
		this.set({name:'Starlet', x,y,rotation:(rotation||0)});
		this.drawMe(color);
		this.on('pressmove', this.handlePressMove);
		this.detached = false;
	}

	drawMe(color='gold') {
		let w = Starlet.w;
		let h1 = Starlet.h1;
		let h = Starlet.h;

		// color = this.rotation?'gold':'crimson';
		this.cmd = this.graphics.f(color).command;
		this.graphics.mt(0,0).lt(w/2,h1).lt(0,h).lt(-w/2,h1).lt(0,0).f();
	}

	recolor() {
		this.drawMe(colorList[random(colorList.length)]);
	}

	detach() {
		var {x,y} = this.parent.localToGlobal(this.x,this.y);
		this.parent.removeChild(this);
		stage.addChild(this);
		this.init = {x, y, rotation: this.rotation, scaleY: this.scaleY, color: this.cmd.style};
		this.detached = true;

	}	

	handlePressMove(evt) {
		if(!this.detached) {
			this.detach();
		} 
		this.set({x:evt.stageX,y:evt.stageY});
	}
}


class Star extends createjs.Container {

	constructor(x,y,color) {
		super();
		this.set({x,y});
		this.drawMe(color);
	}

	drawMe(color='black') {
		let rc = Star.getRandomColor();
		Array.from({length:5},(o,i)=> {
			let s = new Starlet(this.x,this.y, 0, rc);
			s.rotation = i*360/5;
			this.addChild(s);
		})
	}

	static getRandomColor() {
		var i = random(colorList.length);
		return colorList[i];
	}
}

/*function makeH(x,y) {
	var res = new createjs.Container();
	res.set({x,y});
	res.setBounds(0,0,100,200);
	[[0,100,180],[0,100,0],[0,100,-90],[50,100,180],[50,100,0]].forEach((arr)=>{
		res.addChild(new Starlet(arr[0],arr[1],arr[2]));
	});
	return res;
}*/

function  makeH(x,y) {
	var res = makeStarletContainer(x,y,[[0,Starlet.h, 180],[0,Starlet.h,0],[0,Starlet.h,-90],[50,Starlet.h,180],[50,Starlet.h,0]]);
	res.setBounds(0,0,Starlet.h,2*Starlet.h);
	return res;
}

function makeA(x,y) {
	var res = new createjs.Container();
	res.set({x,y});
	[[50,0,-20],[50,0,20],[25,Starlet.h+20,-90]].forEach((arr,i)=>{
		let s = new Starlet(arr[0],arr[1],arr[2]);
		if(i < 2) {
			s.scaleY = 2;
		}
		res.addChild(s);
	});
	res.setBounds(0,0,Starlet.h+Starlet.w*2,Starlet.h*2);
	return res;
}

function makeR(x,y) {
	var res = new createjs.Container();
	res.set({x,y});
	[[0,0,0],[0,0,-45],[0,Starlet.h+20,-135],[0,Starlet.h,-45]].forEach((arr,i)=> {
		let s = new Starlet(arr[0],arr[1],arr[2]);
		if(!i) {
			s.scaleY = 2;
		}
		if(i==3) {
			s.scaleY = 1.2;
		}
		res.addChild(s);
	})
	res.setBounds(0,0,Math.sqrt(Starlet.h)+20, Starlet.h * 2);
	return res;
}

function makeT(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-90],[Starlet.h, 0, 0]]);
	res.children.forEach(s=>s.scaleY = 2);
	res.setBounds(0,0,2*Starlet.h,Starlet.h*2);
	return res;
}

function makeC(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-90],[0,0,0],[0,2*Starlet.h,-90]]);
	res.children[1].scaleY = 2;
	res.setBounds(0,0,Starlet.h, Starlet.h*2);
	return res;
}

function makeE(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,0],[0,0,-90],[0,Starlet.h,-90],[0,2*Starlet.h,-90]]);
	res.children[0].scaleY = 2;
	res.setBounds(0,0,Starlet.h, Starlet.h*2);
	return res;
}

function makeF(x,y) {
	var res = makeE(x,y);
	res.children.pop();
	return res;
}

function makeI(x,y) {
	var res =  makeStarletContainer(x,y,[[Starlet.w,0,0]]);
	res.children[0].scaleY = 2;
	res.setBounds(0,0,Starlet.w*2, Starlet.h*2);
	return res;
}


function makeD(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,0],[0,0,-45],[0,Starlet.h * 2, -135]]);
	res.children.forEach((s,i)=>{
		s.scaleY = i?1.4:2;
	});
	res.setBounds(0,0,Math.sqrt(Starlet.h)+20, Starlet.h*2);
	return res;
}

function makeY(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-45],[Starlet.w * 2+20,0,45]]);
	res.children[1].scaleY = 2.2;
	res.setBounds(0,0,2*Starlet.h*0.71, Starlet.h * 2);
	return res;
}


function makeV(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-30],[Starlet.w*3,0, 30]]);
	res.children.forEach(s=>s.scaleY=2);
	res.setBounds(0,0,80,Starlet.h*2);
	return res;
}

function makeJ(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-90],[Starlet.h,0,0], [Starlet.h, Starlet.h,30],[0,Starlet.h,-30]]);
	res.children[0].scaleY = 2; 
	res.setBounds(0,0,60,Starlet.h*1.8);
	return res;
}

function makeM(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,0],[Starlet.h * 2 , 0, 0], [0,0,-45],[Starlet.h * 2, 0, 45]]);
	res.children.map((s,i)=> {
		s.scaleY = (i<2)?2:1.4;
	});
	res.setBounds(0,0,Starlet.h+ 4*Starlet.h1,Starlet.h*2);
	return res;
}


function makeW(x,y) {
	var res = makeM(x,y);
	res.regY = -2*Starlet.h;
	res.children.forEach((s,i)=>{
		s.scaleY *= -1;
		s.rotation *= -1;
		return s;
	});
	return res;
}

function makeO(x,y) {
	return make0(x,y);
}

function makeU(x,y) {
	var res = makeO(x,y);
	res.removeChild(res.children[0]);
	return res;
}

function makeL(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,0],[0,Starlet.h,0],[0,2*Starlet.h,-90]]);
	res.setBounds(0,0,Starlet.h,Starlet.h*2);
	return res;
}

function makeN(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,0],[0,0,-30],[Starlet.h , 2*Starlet.h, 180]]);
	res.children.forEach((s)=>{
		s.scaleY = 2;
	});
	res.setBounds(0,0,Starlet.h,2*Starlet.h)
	return res;
}

function makeDash(x,y) {
	var res =  makeStarletContainer()
}

function makeS(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-90],[0,0,0],[0,Starlet.h,-90],[Starlet.h,Starlet.h,0],[Starlet.h,Starlet.h*2,90]]);
	res.setBounds(0,0,Starlet.h,Starlet.h*2);
	return res;
}

function make2(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-90],[Starlet.h,0,0],[Starlet.h,Starlet.h,90],[0,Starlet.h,0],[0,Starlet.h*2, -90]]);
	res.setBounds(0,0,Starlet.h, Starlet.h*2);
	return res;
}

function make0(x,y) {
	var res = makeStarletContainer(x,y,[[0,0,-90],[Starlet.h,Starlet.h,180],[Starlet.h,Starlet.h,0],[0,Starlet.h,180],[0,Starlet.h,0],[Starlet.h,2*Starlet.h, 90]]);
	res.setBounds(0,0,Starlet.h,Starlet.h*2);
	return res;
}

function makeP(x,y) {
	var r = makeR(x,y);
	r.removeChild(r.children.pop());
	return r;	
}



function makeB(x,y) {
	var p = makeP(x,y);
	var s1 = p.children[1].clone(true);
	var s2 = p.children[2].clone(true);
	[s1,s2].forEach(s=>{
		s.y += Starlet.h;
		p.addChild(s);
	});
	return p;
}


function makeStarletContainer(x,y,coordsList) {
	var res = new createjs.Container();
	res.set({x,y});
	coordsList.forEach(([x,y,angle])=>{
		let s = new Starlet(x,y,angle);
		res.addChild(s);
	})
	return res;
} 

class Word extends createjs.Container {

	constructor(w,y) {
		super();
		let occupiedWidth = 0;
		w.split('').forEach((lett,i)=> {
			let c = this.makeLetter(lett);
			// stage.addChild(c);
			let bounds = c.getBounds();
			occupiedWidth += bounds?.width + 30; 
			// this.setBounds(occupiedWidth, bounds.height);
			this.addChild(c);
		});
		this.set({x: stage.canvas.width/2 - occupiedWidth/2, y});
	}

	makeLetter() {
		 return window['make'+lett.toUpperCase()](occupiedWidth,i*150);
	}
}

function prepareWord(word,i) {
	var res = [];
	var occupiedWidth = 0;
	word.split('').forEach((lett,j)=> {
		let c = window['make'+lett.toUpperCase()](occupiedWidth,i*150 + 30);
		// stage.addChild(c);
		let bounds = c.getBounds();
		occupiedWidth += bounds?.width + 30; 
		res.push(c);
	});



	// center hori
	res.forEach(c=> {
		c.x += (stage.canvas.width - occupiedWidth)/2 + 80; // last is magic number due to stage scale
	});
	return res;
}


function prepareMessage(msg) {
	// var msg = 'Happy Teachers Day Vijaya Miss';
	let res = [];
	msg.split(' ').forEach((w,i)=>{
		res = res.concat(prepareWord(w,i));
		/*let occupiedWidth = 0;
		w.split('').forEach((lett,j)=> {
			let c = window['make'+lett.toUpperCase()](occupiedWidth,i*150);
			// stage.addChild(c);
			let bounds = c.getBounds();
			occupiedWidth += bounds?.width + 30; 
			res.push(c);
		});*/
		/*res.push(w);
		let wordContainer = new Word(w,i*150);
		res.push(wordContainer);*/
	});
	return res;
}

function permutate(arr) {
	var res = arr.slice();
	for(var k = 0; k < 230; k++) {
		var i = Math.floor(Math.random() * arr.length);
		var j = Math.floor(Math.random() * arr.length);
		var tmp = res[i];
		res[i] = res[j];
		res[j] = tmp;

	}
	return res;
}

function reinsertMessage(starStarletList,messageStarletList) {
	var targetList = permutate(starStarletList.slice(0,messageStarletList.length));
	var waitingTime = 1500;
	starStarletList.forEach((s,i)=>{
		if(i < messageStarletList.length) {
			var target = targetList[i];
			var path = Array.from({length:3}, ()=>{
				return [Math.floor(Math.random()*stage.canvas.width), Math.floor(Math.random()*stage.canvas.height)];
			}).concat([target.x,target.y]).flat();		
			path = [s.x,s.y].concat(path);

			createjs.Tween.get(s.cmd).wait(waitingTime).to({style: Star.getRandomColor()},2000);
			createjs.Tween.get(s).wait(waitingTime).call(()=>{
				s.detach();
			}).to({guide:{path}, rotation: target.rotation, scaleY:target.scaleY},2000).call(()=>{
				if(i==messageStarletList.length-1) {
					// comeBackToStarPositions(starStarletList, messageStarletList);
					reinsertMessage(starStarletList, messageStarletList);
				}
			});
		}
	});
}

/*function comeBackToStarPositions(starStarletList, messageStarletList) {
	starStarletList.forEach((s,i)=>{
		var path = Array.from({length:4}, ()=>{
			return [Math.floor(Math.random()*stage.canvas.width), Math.floor(Math.random()*stage.canvas.height)];
		}).concat([s.init.x,s.init.y]).flat();		
		var waitingTime = 1000;
		createjs.Tween.get(s.cmd).wait(waitingTime).to({style: Star.getRandomColor()},2000);
		createjs.Tween.get(s).wait(waitingTime).call(()=>{
			s.detach();
		}).to({guide:{path}, rotation: s.init.rotation, scaleY:s.init.scaleY},2000).call(()=>{
			if(i==messageStarletList.length-1) {
				reinsertMessage(starStarletList, messageStarletList);
			}
		});
	})
}*/


function random(n) {
	return Math.floor(n * Math.random());
}



function findDescendantsByName(ancestor,name) {
	var res = [];
	var stack = [ancestor];
	while(stack.length) {
		var obj = stack.pop();
		if(obj.name == name) {
			res.push(obj);
		}
		if(obj.children) {
			for(let c of obj.children) {
				stack.push(c);
			}
		}
	}
	return res;
}


function cullMessage() {
	var usp = new URLSearchParams(window.location.search);
	var msg =  usp.get('msg');
	if(!msg) {
		return  'Happy New Year 2022';;
	} else {
		return atob(msg);
	}
}


window.addEventListener('load',()=>{
	createjs.MotionGuidePlugin.install();
	createjs.ColorPlugin.install('rgb');
	var canvas = document.querySelector('canvas');


	stage = new createjs.Stage(canvas);
	stage.scale = 0.79;

	var fond = new createjs.Shape();
	// console.log()
	fond.set({x:0,y:0});
	console.log(stage.canvas.width,stage.canvas.height);
	console.log(canvas.width,canvas.height);
	fond.graphics.f('HoneyDew').dr(0,0,stage.canvas.width/stage.scale, stage.canvas.height/stage.scale).ef();
	// console.log(fond.getBounds());
	stage.addChild(fond);

	var msg = cullMessage();


	var messageStarletList = prepareMessage(msg).flatMap((cont,i)=> cont.children );


	var starStarletList = [];
	var nbStars = Math.ceil(messageStarletList.length/5);

	for(let i = 0; i < (nbStars/5); i++) {
		for(let j = 0; j < 5; j++) {
			let offset = 80;
			let s = new Star(i*80 + offset ,j*120 + offset, 'crimson');
			starStarletList = starStarletList.concat(findDescendantsByName(s,'Starlet'));
			stage.addChild(s);
			s.x += (canvas.width - Starlet.h*2*5)/2;
		}
	}

	starStarletList.forEach((s,i)=> {
		var mp, rotation = 0, scaleY = 1;
		// s.init = {x: s.x, y: s.y, rotation: s.rotation, scaleY: s.scaleY, color: s.cmd.style};
		if(i < messageStarletList.length) {
			mp = messageStarletList[i].localToGlobal(0, 0);
			rotation = messageStarletList[i].rotation;
			scaleY = messageStarletList[i].scaleY;
		} else {
			mp = {x:-50,y:-10};
		}

		// creation of random path for Starlet terminating with destination
		var path = Array.from({length:5}, ()=>{
			return [Math.floor(Math.random()*stage.canvas.width), Math.floor(Math.random()*stage.canvas.height)];
		}).concat([mp.x,mp.y]).flat();

		// console.log(s.parent);
		var start = s.parent.localToGlobal(s.x,s.y); 
		path = [start.x,start.y].concat(path);

		var waitingTime = 18 * s.y;
		createjs.Tween.get(s).wait(waitingTime).call(()=>{
			s.detach();
		}).to({guide:{path}, rotation, scaleY},2000).call(()=>{
			if(i==starStarletList.length-1) {
				reinsertMessage(starStarletList,messageStarletList);
			}
		});
	});


	stage.on('click',(evt)=>{
		console.log(evt.target);
	})



	/*stage.addChild(makeH(100,100));
	stage.addChild(makeA(300,100));
	stage.addChild(makeR(400,100));
	stage.addChild(makeT(500,300));
	stage.addChild(makeI(600,300));
	stage.addChild(makeD(100,300));
	stage.addChild(makeY(300,300));
	stage.addChild(makeM(400,500));
	stage.addChild(makeS(530,500));
	stage.addChild(makeP(630,500));
	stage.addChild(makeB(80,500));
	stage.addChild(makeV(180,500));
	stage.addChild(makeJ(630,100));
	*/
	createjs.Ticker.on('tick', stage);
	
});