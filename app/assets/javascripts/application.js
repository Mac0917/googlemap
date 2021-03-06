// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require underscore
//= require gmaps/google
//= require activestorage
//= require turbolinks
//= require_tree .

$(function() {
  $(".btn").click(function(){
      // Geolocation APIに対応している
if( navigator.geolocation ) // Geolocation APIに対応している
{
	// 現在位置を取得できる場合の処理
	alert( "あなたの端末では、現在位置を取得することができます。" ) ;
}

// Geolocation APIに対応していない
else
{
	// 現在位置を取得できない場合の処理
	alert( "あなたの端末では、現在位置を取得できません。" ) ;
}
  })

  $(".btn2").click(function(){
    
// 対応している場合
if( navigator.geolocation )
{
	// 現在地を取得
	navigator.geolocation.getCurrentPosition(

		// [第1引数] 取得に成功した場合の関数
		function( position )
		{
			// 取得したデータの整理
			var data = position.coords ;

			// データの整理
			var lat = data.latitude ;
			var lng = data.longitude ;
			// var alt = data.altitude ;
			// var accLatlng = data.accuracy ;
			// var accAlt = data.altitudeAccuracy ;
			// var heading = data.heading ;			//0=北,90=東,180=南,270=西
			// var speed = data.speed ;

			// アラート表示
			alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;
            alert( `あなたの現在位置は、${lat},${lng}`  ) ;
			// HTMLへの書き出し
			//document.getElementById( '.btn2' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>' ;

			// 位置情報
			//var latlng = new google.maps.LatLng( lat , lng ) ;

			// Google Mapsに書き出し
			// var map = new google.maps.Map( document.getElementById( 'map-canvas' ) , {
			// 	zoom: 15 ,				// ズーム値
			// 	center: latlng ,		// 中心座標 [latlng]
			// } ) ;

			// マーカーの新規出力
			// new google.maps.Marker( {
			// 	map: map ,
			// 	position: latlng ,
			// } ) ;
		},

		// [第2引数] 取得に失敗した場合の関数
		function( error )
		{
			// エラーコード(error.code)の番号
			// 0:UNKNOWN_ERROR				原因不明のエラー
			// 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
			// 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
			// 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

			// エラー番号に対応したメッセージ
			var errorInfo = [
				"原因不明のエラーが発生しました…。" ,
				"位置情報の取得が許可されませんでした…。" ,
				"電波状況などで位置情報が取得できませんでした…。" ,
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
			] ;

			// エラー番号
			var errorNo = error.code ;

			// エラーメッセージ
			var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

			// アラート表示
			alert( errorMessage ) ;

			// HTMLに書き出し
			//document.getElementById(".btn2").innerHTML = errorMessage;
		} ,

		// [第3引数] オプション
		{
			"enableHighAccuracy": false,
			"timeout": 8000,
			"maximumAge": 2000,
		}

	) ;
}

// 対応していない場合
else
{
	// エラーメッセージ
	var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

	// アラート表示
	alert( errorMessage ) ;

	// HTMLに書き出し
	document.getElementById( '.btn2' ).innerHTML = errorMessage ;
}

   
  })
});





//住所の文字列から緯度経度を生成  精度高い 
$(function() {

function getLatLng(place) {

	// ジオコーダのコンストラクタ
	var geocoder = new google.maps.Geocoder();
  
	// geocodeリクエストを実行。
	// 第１引数はGeocoderRequest。住所⇒緯度経度座標の変換時はaddressプロパティを入れればOK。
	// 第２引数はコールバック関数。
	geocoder.geocode({
	  address: place
	}, function(results, status) {
	  if (status == google.maps.GeocoderStatus.OK) {
		console.log(results)
  
		// 結果の表示範囲。結果が１つとは限らないので、LatLngBoundsで用意。
		//var bounds = new google.maps.LatLngBounds();
  
		//for (var i in results) {
		  //if (results[i].geometry) {
  
			// 緯度経度を取得
			//var latlng = results[i].geometry.location;
			var latlng = results[0].geometry.location;

			// 住所を取得(日本の場合だけ「日本, 」を削除)
			//var address = results[0].formatted_address.replace(/^日本, /, '');
  
			// 検索結果地が含まれるように範囲を拡大
			//bounds.extend(latlng);
  
			// あとはご自由に・・・。
			// new google.maps.InfoWindow({
			//   content: address + "<br>(Lat, Lng) = " + latlng.toString()
			// }).open(map, new google.maps.Marker({
			//   position: latlng,
			//   map: map
			// }));
			alert(latlng);
			
		  //}
		//}
  
		// 範囲を移動
		//map.fitBounds(bounds);
  
	  } else if (status == google.maps.GeocoderStatus.ERROR) {
		alert("サーバとの通信時に何らかのエラーが発生！");
	  } else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
		alert("リクエストに問題アリ！geocode()に渡すGeocoderRequestを確認せよ！！");
	  } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
		alert("短時間にクエリを送りすぎ！落ち着いて！！");
	  } else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
		alert("このページではジオコーダの利用が許可されていない！・・・なぜ！？");
	  } else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
		alert("サーバ側でなんらかのトラブルが発生した模様。再挑戦されたし。");
	  } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
		alert("見つかりません");
	  } else {
		alert("えぇ～っと・・、バージョンアップ？");
	  }
	});
  }

  $(".btn3").click(function(){
	getLatLng("神奈川県横浜市")
	getLatLng("神奈川県横浜市")
	getLatLng("fasfkakfjasif")  //見つからない時は "見つかりません"
	getLatLng("北海道")
  });

});