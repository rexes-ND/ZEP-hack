// let erkhes_obj = App.loadSpritesheet('res/Object_0106.png')

class Item {
    constructor(name, price, description, picture) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.picture = picture;
        this.link = link
    }
}

class User {
    constructor(name, items){
        this.name = name;
        this.items = items;
        this.isSeller = false;
    }
}

// App.addOnKeyDown(81, function (player) {
//     Map.putObject(0, 0, erkhes_obj, {overlap: true});
//     Map.putObject(10, 10, erkhes_obj, {overlap: true});
//     Map.putObject(15, 15, erkhes_obj, {overlap: true});
// });

function replaceAll(s){
    const slen = s.length
    let res = ""
    for (let i = 0; i < slen; ++i){
        if (s[i] === ' ') {
            res = res + '^';
        }
        else {
            res = res + s[i]
        }
    }
    return res;
}

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
            let itemId = Math.random()
            // let itemName = msg.submissionObj['itemName'].replaceAll(' ', '^')
            let itemName = replaceAll(msg.submissionObj['itemName'])
            let itemPrice = msg.submissionObj['itemPrice']
            // let description = msg.submissionObj['description'].replaceAll(' ', '^')
            let description = replaceAll(msg.submissionObj['description'])
            // submissionObj = {
            //     'userId',
            //     'itemName',
            //     'itemPrice',
            //     'description',
            //     'itemId',
            // }
            itemId = itemId.toString()
            userId = player.id.toString()
            
            App.httpGet(`https://morning-everglades-39102.herokuapp.com/?post=true&userId=${userId}&itemName=${itemName}&itemPrice=${itemPrice}&description=${description}&itemId=${itemId}`, null, function(res) {
                let response =  JSON.parse(res);
                player.showCenterLabel(`Successfully created store number 7`)
            })
            // App.httpPost('https://morning-everglades-39102.herokuapp.com/', null, msg.submissionObj, (res) => {
            //     let response = JSON.parse(res);
            //     player.showCenterLabel(`Entered obj: ${response}`)
            // })
            // App.httpGet('https://morning-everglades-39102.herokuapp.com/', null, function(res) {
            //     let response =  JSON.parse(res);
            //     player.showCenterLabel(`Entered obj: ${response[0]['itemId']}`)
            // })
            // player.showCenterLabel(`Entered obj: ${msg.submissionObj.image}`);
            // msg.submissionObj
            player.tag.widget.destroy();
            player.tag.widget = null
        }
	});
});