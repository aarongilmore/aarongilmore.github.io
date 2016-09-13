# Dashboard screen with click enabled for all relative screens
dashboard = new Layer
	x: 0
	y: 0
	width: 640
	height: 1136
	image: "images/dashboard.png"
	
# Friends hotspot calls the friends layer
friendsHotspot = new Layer
	superLayer:dashboard
	x:13 
	y:60 
	width: 116 
	height: 50 
	backgroundColor: "transparent", opacity:.5

# Animates in the friends layer
friendsHotspot.on Events.Click, -> 
	friendsHotspot.animate
	properties:
        x:-240
    curve: "linear",
    time:0.2
    
    dashboard.on Events.AnimationEnd, ->
    friends.animate
        properties:
            x:0
        curve: "ease-in",
        time:0.2
        
# Settings hotspot calls the friends layer
settingsHotspot = new Layer
	superLayer:dashboard
	x:500 
	y:60 
	width: 120 
	height: 50 
	backgroundColor: "transparent", opacity:.5
	
# Animates in the settings layer
settingsHotspot.on Events.Click, -> 
	settingsHotspot.animate
	properties:
        x:-240
    curve: "linear",
    time:0.2
    
    settingsHotspot.on Events.AnimationEnd, ->
    settings.animate
        properties:
            x:0
        curve: "ease-in",
        time:0.2

# Friends layer contains the assets for the screen        
friends = new Layer
	superLayer:dashboard
	x: -640
	y: 0
	width: 640
	height: 1136
	image: "images/friends.png"
	
# The subLayer
friendSwipe = new Layer
    height: 177 
    width: 1280
    superLayer:friends
    image: "images/friendSwipe.png"
    
friendSwipe.y = 127

# Make the layer draggable 
friendSwipe.draggable.enabled = true
friendSwipe.draggable.speedY = 0

friendSwipe.on Events.DragEnd, ->
	
	if friendSwipe.x < -80 
			# Dragged enough, move to the next slide after a delay
			friendSwipe.animate
				properties:
					x: -640
				time: 0.2
				curve: 'ease-out'

	else
		# Not dragged enough, move it back
		friendSwipe.animate
			properties:
				x: 0
			time: 0.2
			curve: 'ease-out'
			
			
# New hotspot layer created with a superlayer of friends
backHotspot = new Layer
	superLayer:friends
	x:13 
	y:60 
	width: 100 
	height: 50 
	backgroundColor: "transparent", opacity:.5

# Toggle states on click, will animate out the friends screen
backHotspot.on Events.Click, -> 
	friends.animate
	properties:
        x:640
    curve: "linear",
    time:0.2
    
    friends.on Events.AnimationEnd, ->
    friends.animate
        properties:
            x:-640
        curve: "linear",
        time:0.2

# Settings layer contains the assets for the screen        
settings = new Layer
	superLayer:dashboard
	x: 640
	y: 0
	width: 640
	height: 1136
	image: "images/settings.png"
	
# New hotspot layer created with a superlayer of settings
backHotspot = new Layer
	superLayer:settings
	x:13 
	y:60 
	width: 100 
	height: 50 
	backgroundColor: "transparent", opacity:.5

# Toggle states on click, will animate out the settings screen
backHotspot.on Events.Click, -> 
	settings.animate
	properties:
        x:640
    curve: "linear",
    time:0.2
    
    settings.on Events.AnimationEnd, ->
    settings.animate
        properties:
            x:640
        curve: "linear",
        time:0.2

# Weight Picker hotspot calls the weightPicker layer
weightPickerHotspot = new Layer
	superLayer:dashboard
	x:70 
	y:450 
	width: 490 
	height: 150 
	backgroundColor: "transparent", opacity:.5
	
# Animates in the weightPicker layer
weightPickerHotspot.on Events.Click, -> 
	weightPickerHotspot.animate
	properties:
        x:-540
    curve: "linear",
    time:0.2
    
    weightPickerHotspot.on Events.AnimationEnd, ->
    weightPicker.animate
        properties:
            y:0
        curve: "ease-in",
        time:0.2
        
    weightPickerHotspot.on Events.AnimationEnd, ->
    layerB.animate
        properties:
            y:80
        curve: "ease-in",
        time:0.2


# Weight Picker screen with click event
weightPicker = new Layer
	x: 0
	y: 1136
	width: 640
	height: 1136
	image: "images/weightPicker.png"
	
# New hotspot layer created with a superlayer of settings
backHotspot = new Layer
	superLayer:weightPicker
	x:70 
	y:450 
	width: 490 
	height: 150 
	backgroundColor: "transparent", opacity:.5	
	
# Toggle states on click, will animate out the settings screen
backHotspot.on Events.Click, -> 
	weightPicker.animate
	properties:
        x:640
    curve: "linear",
    time:0.2
    
    weightPicker.on Events.AnimationEnd, ->
    weightPicker.animate
        properties:
            y:1136
        curve: "linear",
        time:0.2
        
    layerA.on Events.AnimationStart, ->
    layerA.animate
    layerB.animate
        properties:
            y:1136
        curve: "linear",
        time:0.2
		
# The superLayer
layerA = new Layer
   	width: 640
    height: 236
    y: 900
    backgroundColor: "transparent"

# The subLayer
layerB = new Layer
    height:80 
    width:2384
    superLayer:layerA
    image: "images/scale.png"

# Enable scrolling on the superLayer

layerA.scrollHorizontal = true

# Picker position
layerB.y = 600

# Setup screen with click enabled		
setup = new Layer
	x: 0
	y: 0
	width: 640
	height: 1136
	image: "images/setup.png"
	
# Hotspot sub layer to layer 0
setupHS = new Layer
	superLayer:setup
	x:80 
	y:970 
	width: 480 
	height: 100 
	backgroundColor: "transparent", opacity:.5
	
# Toggle states on click
setupHS.on Events.Click, -> 
	setupHS.animate
	properties:
        x:0
    curve: "linear",
    time:0.2
    
    setup.on Events.AnimationEnd, ->
    setup.animate
        properties:
            y:-1136
        curve: "ease-in-out",
        time:0.5


# Onboarding 3 of 3 with drag enabled			
onboardingThree = new Layer
	x: 0
	y: 0
	width: 640
	height: 1136
	image: "images/onboardingThree.png"
	
# Make the layer draggable 
onboardingThree.draggable.enabled = true
onboardingThree.draggable.speedY = 0

onboardingThree.on Events.DragEnd, ->
	
	if onboardingThree.x < -80 
			# Dragged enough, move to the next slide after a delay
			onboardingThree.animate
				properties:
					x: -640
				time: 0.2
				curve: 'ease-out'

	else
		# Not dragged enough, move it back
		onboardingThree.animate
			properties:
				x: 0
			time: 0.2
			curve: 'ease-out'
	

# Onboarding 2 of 3 with drag enabled			
onboardingTwo = new Layer
	x: 0
	y: 0
	width: 640
	height: 1136
	image: "images/onboardingTwo.png"
	
# Make the layer draggable 
onboardingTwo.draggable.enabled = true
onboardingTwo.draggable.speedY = 0

onboardingTwo.on Events.DragEnd, ->
	
	if onboardingTwo.x < -80 
			# Dragged enough, move to the next slide after a delay
			onboardingTwo.animate
				properties:
					x: -640
				time: 0.2
				curve: 'ease-out'

	else
		# Not dragged enough, move it back
		onboardingTwo.animate
			properties:
				x: 0
			time: 0.2
			curve: 'ease-out'
	

# Onboarding 1 of 3 with drag enabled			
onboardingOne = new Layer
	x: 0
	y: 0
	width: 640
	height: 1136
	image: "images/onboardingOne.png"
	
# Make the layer draggable 
onboardingOne.draggable.enabled = true
onboardingOne.draggable.speedY = 0

onboardingOne.on Events.DragEnd, ->
	
	if onboardingOne.x < -80 
			# Dragged enough, move to the next slide after a delay
			onboardingOne.animate
				properties:
					x: -640
				time: 0.2
				curve: 'ease-out'

	else
		# Not dragged enough, move it back
		onboardingOne.animate
			properties:
				x: 0
			time: 0.2
			curve: 'ease-out'
	

# Sign in screen with click event	
signIn = new Layer
	x: 0
	y: 0
	width: 640
	height: 1136
	image: "images/signIn.png"
	
# Hotspot sub layer to layer 0
signInHS = new Layer
	superLayer:signIn
	x:80 
	y:700 
	width: 480 
	height: 100 
	backgroundColor: "transparent", opacity:.5
	
# Animates out the click hotspot with the screen so it doesn't interfere on other screens
signInHS.on Events.Click, -> 
	signInHS.animate
	properties:
        x:-640
    curve: "linear",
    time:0.2
    
# Animate out the sign in screen
    signIn.on Events.AnimationEnd, ->
    signIn.animate
        properties:
            x:-640
        curve: "linear",
        time:0.2