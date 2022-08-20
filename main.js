let erkhes_obj = App.loadSpritesheet('res/Object_0106.png')

class Item {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}

class User {
    constructor(name, items){
        this.name = name;
        this.items = items;
    }
}

App.addOnKeyDown(81, function (player) {
    Map.putObject(0, 0, erkhes_obj, {overlap: true});
    Map.putObject(10, 10, erkhes_obj, {overlap: true});
    Map.putObject(15, 15, erkhes_obj, {overlap: true});
});

// Activates function when a player enters
App.onJoinPlayer.Add(function (player) {
	player.tag = {
		widget: null,
	};

	player.tag.widget = player.showWidget("res/sample.html", "top", 600, 500);
	player.tag.widget.onMessage.Add(function (player, msg) {
		// Closes the widget when the 'type: close' message is sent from the widget to the App 
		if (msg.type == "close") {
			player.showCenterLabel("Widget has been closed.");
			player.tag.widget.destroy();
			player.tag.widget = null;
		}
        else if (msg.type == "submit") {
            player.showCenterLabel(`Entered obj: ${msg.submissionObj}`);
            // msg.submissionObj
            player.tag.widget.destroy();
            player.tag.widget = null
        }
	});
});


let testObject = App.loadSpritesheet("object.png");

App.onStart.Add(function () {
	Map.putObject(5, 5, testObject, { overlap: true });
});

// Calls event when the player collides with an object
App.onObjectTouched.Add(function (sender, x, y, tileID) {
	Map.putObject(x, y, null);
	App.showCenterLabel(
		`${sender.name} has collided with an object at the coordinates : (${x}, ${y}).`
	);
});