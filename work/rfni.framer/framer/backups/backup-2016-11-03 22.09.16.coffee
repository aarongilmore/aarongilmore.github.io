
card = new Layer
	width: 676
	height: 851
	image: "images/card.png"
	x: 301
	y: 128

est = new Layer
	width: 676
	height: 426
	image: "images/est.png"
	x: 301
	y: 128
	
Text = new Layer
	image: "images/Text.png"
	x: 381
	y: 640
	width: 295
	height: 212
	
pop = new Layer
	width: 514
	height: 304
	image: "images/pop.png"
	y: 612
	x: 381
	opacity: 0.00
	

est.states.add
	stateA:
		y: 52
		opacity: 0.00

Text.states.add
	stateA:
		y: 266
		x: 381
		
pop.states.add
	stateA:
		opacity: 1.00		
		y: 553


Framer.Defaults.Animation = curve: 'spring(300,30,0)'

card.onClick (event, layer) ->
	est.states.next()
	Text.states.next()
	pop.states.next()
