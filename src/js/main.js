L.mapbox.accessToken = 'pk.eyJ1IjoiZ3JlZ29yeS1qb2x5IiwiYSI6ImNpaHAxbzZyNjAwMGV2Y2txbG95NGhmN3gifQ.zC-F5aeA05XPsMWKSTyeQA';
// Replace 'mapbox.streets' with your map id.
var mapboxTiles = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + L.mapbox.accessToken, {
    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
});

var geolocate = document.getElementById('geolocate');
var map = L.mapbox.map('map', 'mapbox.streets');

var myLayer = L.mapbox.featureLayer().addTo(map);

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation
if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);

    myLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

    // And hide the geolocation button
    geolocate.parentNode.removeChild(geolocate);
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});

/*
var canvasTiles = L.tileLayer.canvas();

canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
    var ctx = canvas.getContext('2d');
    ctx.fillText(tilePoint.toString(), 50, 50);
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#000';
    ctx.fillRect(10, 10, 246, 246);
};

canvasTiles.addTo(map);

// // // // // // // // //
// Frog                 //
// // // // // // // // //

// init canvas
var     canvas = $( 'canvas' )
    ,        ctx = canvas[0].getContext( '2d' ) // world
    ,       ctx2 = canvas[1].getContext( '2d' ) // fog
    ,       ctx3 = canvas[2].getContext( '2d' ) // chars
    ,      mDown = false
    ,         r1 = 100
    ,         r2 = 300
    ,    density = .4
    , hideOnMove = true
    ,   hideFill = 'rgba( 0, 0, 0, .7 )'
    ,    overlay = 'rgba( 0, 0, 0, 1 )'
    ;

if( !hideOnMove ){
    // shouldn't be done like this, but this is a demo
    canvas.get(1).remove();
}

// black out the canvas
ctx.fillStyle = overlay;
ctx.fillRect( 0, 0, 1280, 800 );

// set up our "eraser"
ctx.globalCompositeOperation = 'destination-out';

canvas.last()
    .on( 'mousemove', function( ev, ev2 ){
        ev2 && ( ev = ev2 );

        var pX = ev.pageX
            , pY = ev.pageY
            ;

        // reveal wherever we drag
        var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
        radGrd.addColorStop(       0, 'rgba( 0, 0, 0,  1 )' );
        radGrd.addColorStop( density, 'rgba( 0, 0, 0, .1 )' );
        radGrd.addColorStop(       1, 'rgba( 0, 0, 0,  0 )' );

        ctx.fillStyle = radGrd;
        ctx.fillRect( pX - r2, pY - r2, r2*2, r2*2 );

        // partially hide the entire map and re-reval where we are now
        ctx2.globalCompositeOperation = 'source-over';
        ctx2.clearRect( 0, 0, 1280, 800 );
        ctx2.fillStyle = hideFill;
        ctx2.fillRect ( 0, 0, 1280, 800 );

        var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
        radGrd.addColorStop(  0, 'rgba( 0, 0, 0,  1 )' );
        radGrd.addColorStop( .8, 'rgba( 0, 0, 0, .1 )' );
        radGrd.addColorStop(  1, 'rgba( 0, 0, 0,  0 )' );

        ctx2.globalCompositeOperation = 'destination-out';
        ctx2.fillStyle = radGrd;
        ctx2.fillRect( pX - r2, pY - r2, r2*2, r2*2 );

        // hide characters except where we can see.  Can this be done in ctx2?
        ctx3.clearRect( 0, 0, 1280, 800 );

        // draw "characters"
        ctx3.globalCompositeOperation = 'source-over';
        ctx3.fillStyle = '#F00';
        for( var i=0; i<20; i++ ){
            for( var j=0; j<20; j++ ){
                ctx3.fillRect( i*100, j*100, 10, 10 );
            }
        }

        // hide characters except for in current location
        ctx3.globalCompositeOperation = 'destination-in';
        ctx3.fillStyle = radGrd;
        ctx3.fillRect( 0, 0, 1280, 800 );
    })
    .trigger( 'mousemove', {pageX: 150, pageY:150 });

// cheat codes
var keyHistory = '';
$( document.body )
    .on( 'keypress', function( ev ){
        keyHistory += String.fromCharCode( ev.keyCode ).toLowerCase();
        if( ~keyHistory.indexOf( 'blacksheepwall' ) ){
            canvas.remove();
        }
    } );*/
