let erkhes_obj = App.loadSpritesheet('res/Object_0106.png')

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
            player.showCenterLabel(`Entered name: ${msg.name}`);
            player.tag.widget.destroy();
            player.tag.widget = null
        }
	});
});