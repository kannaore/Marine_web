"use strict";
const baseline      = {};

/* ******************** alert, confirm 함수 ******************** */
baseline.alert = async function(_obj, _reqMsg) {
	const $layerId			= $("#alertPopup");

	front.pop.open('alertPopup' , _obj , _reqMsg);
	return await new Promise(resolve => {
		// 확인 버튼을 클릭했을 때 이벤트
		const alertButton = $layerId.find('[id=btnAlert]')[0];
		alertButton.addEventListener('click', function() {
			front.pop.close('alertPopup');
			setTimeout(function() {
				resolve(true);
			}, 100);
		});
	});


};
baseline.confirm = async function( _obj, _reqMsg) {

	const $layerId			= $("#confirmPopup");
	front.pop.open('confirmPopup' , _obj, _reqMsg);

	return await new Promise(resolve => {
		// 확인 버튼을 클릭했을 때 이벤트
		const confirmButton = $layerId.find('[id=btnConfirm]')[0];
		confirmButton.addEventListener('click', function() {
			front.pop.close('confirmPopup');
			setTimeout(function() {
				resolve(true);
			}, 100);
		});

		// 취소 버튼을 클릭했을 때 이벤트
		const cancelButton = $layerId.find('[id=btnCancel]')[0];
		cancelButton.addEventListener('click', function() {
			front.pop.close('confirmPopup');
			setTimeout(function() {
				resolve(false);
			}, 100);
		});

	});
};
/* ******************** alert, confirm 함수 ******************** */

/* ******************** 공통 함수 ******************** */
// input_id 의 길이를 체크하여 output_id 에 출력
baseline._listener_length = function(input_id, output_id) {
	
	let input_el    = document.getElementById( input_id );
	let output_el   = document.getElementById( output_id );

	if ( input_el.value.length > 0 ) {
		outputLength();
	}

	input_el.addEventListener('keyup', outputLength);
	
	function outputLength() {
		output_el.innerText = input_el.value.length;
	}
}
// _obj 의 길이를 체크하여 byte 형식으로 outputId에 출력하고 제한 byte만큼 자름
baseline.checkStringMaxByte = function(_obj, _outputId, _maxByte) {
	let textVal 	= _obj.value; 		//입력한 문자
	let textLen 	= textVal.length;   //입력한 문자수
	let totalByte 	= 0;
	let rLen		= 0;

	for(let i=0 ; i < textLen ; i++){
		const each_char = textVal.charAt(i);
		const uni_char = escape(each_char);
		if(uni_char.length > 4){
			totalByte += 2;
		}else{
			totalByte += 1;
		}
		if(totalByte <= _maxByte){
			rLen = i+1;
		}
	}

	if(totalByte > _maxByte){
		_obj.value = textVal.substr(0, rLen);
		baseline.checkStringMaxByte(_obj, _outputId, _maxByte);
	}else{
		document.getElementById(_outputId).innerText = totalByte;

	}

}
// input 박스 엔터키 입력시 자동으로 submit 방지 (textarea 허용)
baseline._listener_ignore_enter = function( ignore_tag ) {
	
	let ignore_el_arr    = document.getElementsByTagName(ignore_tag);
	
	for (let i = 0; i < ignore_el_arr.length; i++) {
		ignore_el_arr[i].addEventListener('keydown', ignoreEnter);
	}
	
	function ignoreEnter(evt) {
		if (evt.code === "Enter") {
			evt.preventDefault();
		}
	}
}
/* ******************** 공통 함수 ******************** */


/* ******************** 문자열 prototype 정의 ******************** */
//문자열의 좌우공백 제거
baseline._string_trim = function () {
	return this.replace(/(^\s*)|(\s*$)/gi, "");
}

//문자열의 왼쪽부터 지정한 수만큼의 문자를 반환
baseline._string_left = function (num) {
	return this.substring(0, num);
}

//문자열의 오른쪽부터 정해진 수 만큼의 문자를 반환
baseline._string_right = function (num) {
	return this.substring((this.length - num), this.length);
}

//문자열의 바이트수를 반환
baseline._string_bytes = function () {
	var str = this;
	var l = 0;
	for (var i = 0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
	}
	return l;
}

//바이트 수 만큼 문자열을 자름
baseline._string_cutbytes = function (len) {
	var str = this;
	var l = 0;
	for (var i = 0; i < str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len) return str.substring(0, i);
	}
	return str;
}

//거꾸로된 문자열을 반환
baseline._string_reverse = function () {
	var temp_str = "";
	
	for (let i = 1; i <= this.length; i++) {
		temp_str += this.substr(this.length - i, 1);
	}
	
	return temp_str;
}

//문자열을 주어진수만큼 반복하여 연결한후 반환
baseline._string_repeat = function (num) {
	var temp_str = "";
	
	for (let i = 1; i <= num; i++) {
		temp_str += this;
	}
	
	return temp_str;
}

//문자열을 어떠한 길이가 되도록 원본문자열의 왼쪽에 다른 문자열로 채우고 반환
baseline._string_lpad = function (num, str) {
	return (num > this.length) ? (str.baseline_repeat(num - this.length)).left(num - this.length) + this : this;
}

//문자열을 어떠한 길이가 되도록 원본문자열의 오른쪽에 다른 문자열로 채우고 반환
baseline._string_rpad = function (num, str) {
	return (num > this.length) ? this + (str.baseline_repeat(num - this.length)).left(num - this.length) : this;
}

/*
replace 메서드는 일치하는 하나의 문자열만 바꾼후 반환하지만
replaceAll의 경우 일치하는 모든 문자열을 치환후 반환
*/
baseline._string_replaceall = function (str1, str2) {
	var str = "";
	eval("str = /" + str1 + "/gi;");
	return this.replace(str, str2);
}

//문자열중 줄바꿈문자를 HTML 줄바꿈 Tag로 변환하여 반환
baseline._string_nl2br = function () {
	return this.baseline_replaceall("\n", "<br>");
}

//숫자로된 문자열에 3자리마다 콤마를 추가하여 반환
baseline._string_formatnumber = function () {
	return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//특수 문자를 HTML 엔티티로 변환
baseline._string_htmlspecialchars = function (quote_style) {
	var temp_str = "";
	
	temp_str = ((this.baseline_replaceall("&", "&amp;")).baseline_replaceall("<", "&lt;")).baseline_replaceall(">", "&gt;");
	
	switch (quote_style.toLowerCase()) {
		case "compat":
			temp_str = temp_str.baseline_replaceall('"', '&quot;');
			break;
		case "quotes":
			temp_str = temp_str.baseline_replaceall('"', '&quot;');
			temp_str = temp_str.baseline_replaceall("'", "&#39;");
			break;
	}
	return temp_str;
}

//HTML Tag를 제거하고 반환
baseline._string_striptags = function () {
	return this.replace(/[<][^>]*[>]/gi, "");
}

//대소문자를 가리지않고 부분 문자열이 처음 나오는 문자 위치를 반환
baseline._string_iindexOf = function (str) {
	return (this.toLowerCase()).indexOf(str.toLowerCase());
}

//대소문자를 가리지않고 부분 문자열이 마지막으로 나오는 문자 위치를 반환
baseline._string_ilastIndexOf = function (str) {
	return (this.toLowerCase()).lastIndexOf(str.toLowerCase());
}

//패턴 체크 후 Boolean 값 반환
baseline._string_isPattern = function (str) {
	var regx;
	if (this.length === 0 || this == null || this === "undefined") return false;
	
	switch (str.toLowerCase()) {
		case "number":
			regx = /^[0-9]+$/;
			break;
		case "alpha":
			regx = /^[a-zA-Z]+$/;
			break;
		case "alphanum":
			regx = /^[a-zA-Z0-9]+$/;
			break;
		case "hangle":
			regx = /^[가-힣]+$/;
			break;
		case "hanglenum":
			regx = /^[가-힣0-9]+$/;
			break;
		case "zipcode":
			regx = /[0-9]{3}-[0-9]{3}/;
			break;
		case "phone":
			regx = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
			break;
		case "hp":
			regx = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
			break;
		case "date":
			regx = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
			break;
		case "float1":
			regx = /^[0-9.]+$/;
			break;
		case "url":
			regx = /^((http|https|ftp|telnet|news):\/\/[a-z0-9-]+\.[][a-zA-Z0-9:&#@=_~%;\?\/\.\+-]+)$/gi;
			break;
	}
	
	return regx.test(this) ? true : false;
}

baseline._string_onlyNumber = function () {
	return this.replace(/\D/g,'');
}
/* ******************** 문자열 prototype 정의 ******************** */

/* ******************** Date prototype 정의 ******************** */
baseline._date_format = function (f) {
	if (!this.valueOf()) return " ";
	
	let weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	let d = this;
	let h = 0;
	
	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
		switch ($1) {
			case "yyyy":
				return d.getFullYear();
			case "yy":
				return (d.getFullYear() % 1000).zf(2);
			case "MM":
				return (d.getMonth() + 1).zf(2);
			case "dd":
				return d.getDate().zf(2);
			case "E":
				return weekName[d.getDay()];
			case "HH":
				return d.getHours().zf(2);
			case "hh":
				return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm":
				return d.getMinutes().zf(2);
			case "ss":
				return d.getSeconds().zf(2);
			case "a/p":
				return d.getHours() < 12 ? "오전" : "오후";
			default:
				return $1;
		}
	});
};
/* ******************** Date prototype 정의 ******************** */

/* ******************** 일반함수 정의 ******************** */
//확장자 체크함수
baseline._fn_chk_imgfile = function (sFile) {
	var chkstr = ".gif .jpg .jpeg .png";
	var sExt = sFile.match(/\.[^\.]*$/);
	sExt = sExt ? sExt[0].toLowerCase() : ".";
	if (chkstr.indexOf(sExt) < 0) {
		return false;
	} else {
		return true;
	}
}

//메일체크함수
baseline._fn_chk_mail = function (ObjMail) {
	ObjMail = ObjMail.trim();
	if (ObjMail.search(/^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/) == -1) {
		return false;
	}
	return true;
}

baseline._fn_onlyNumber = function () {
	if ((event.keyCode < 48) || (event.keyCode > 57)) {
		if (!(event.keyCode === 45 || event.keyCode === 46)) {
			event.returnValue = false;
		}
	}
}

baseline._fn_dateFormat = function (datebox) {
	var value = datebox.value.trim();
	
	if (value.length === 8) {
		datebox.value = value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
	}
}

baseline._fn_cancelEnter = function () {
	if (event.keyCode === 13) {
		return false;
	}
}

baseline._fn_dateAdd = function (interval, addVal, yyyymmdd, delimiter) {
	/*
	//2011년 09월 11일 오후 03시 45분 42초
	console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
	
	//2011-09-11
	console.log(new Date().format("yyyy-MM-dd"));
	
	//'11 09.11
	console.log(new Date().format("'yy MM.dd"));
	
	//2011-09-11 일요일
	console.log(new Date().format("yyyy-MM-dd E"));
	
	//현재년도 : 2011
	console.log("현재년도 : " + new Date().format("yyyy"));
	 */
	
	if (delimiter !== "") {
		yyyymmdd = yyyymmdd.replace(eval("/\\" + delimiter + "/g"), "");
	}
	
	var yyyy = yyyymmdd.substr(0, 4);
	var mm = yyyymmdd.substr(4, 2);
	var dd = yyyymmdd.substr(6, 2);
	
	if (interval === "yyyy") {
		yyyy = (yyyy * 1) + (addVal * 1);
	} else if (interval === "mm") {
		mm = (mm * 1) + (addVal * 1);
	} else if (interval === "dd") {
		dd = (dd * 1) + (addVal * 1);
	}
	
	var cDate = new Date(yyyy, mm - 1, dd);
	var cYear = cDate.getFullYear();
	var cMonth = cDate.getMonth() + 1;
	var cDay = cDate.getDate();
	
	cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
	cDay = cDay < 10 ? "0" + cDay : cDay;
	
	if (delimiter !== "") {
		return cYear + delimiter + cMonth + delimiter + cDay;
	} else {
		return cYear + '' + cMonth + '' + cDay;
	}
}
/* ******************** 일반함수 정의 ******************** */

String.prototype.baseline_trim              = baseline._string_trim;                //문자열의 좌우공백 제거
String.prototype.baseline_left              = baseline._string_left;                //문자열의 왼쪽부터 지정한 수만큼의 문자를 반환
String.prototype.baseline_right             = baseline._string_right;               //문자열의 오른쪽부터 정해진 수 만큼의 문자를 반환
String.prototype.baseline_bytes             = baseline._string_bytes;               //문자열의 바이트수를 반환
String.prototype.baseline_cutbytes          = baseline._string_cutbytes;            //바이트 수 만큼 문자열을 자름
String.prototype.baseline_reverse           = baseline._string_reverse;             //거꾸로된 문자열을 반환
String.prototype.baseline_repeat            = baseline._string_repeat;              //문자열을 주어진수만큼 반복하여 연결한후 반환
String.prototype.baseline_lpad              = baseline._string_lpad;                //문자열을 어떠한 길이가 되도록 원본문자열의 왼쪽에 다른 문자열로 채우고 반환
String.prototype.baseline_rpad              = baseline._string_rpad;                //문자열을 어떠한 길이가 되도록 원본문자열의 오른쪽에 다른 문자열로 채우고 반환
String.prototype.baseline_replaceall        = baseline._string_replaceall;          //일치하는 모든 문자열을 치환후 반환
String.prototype.baseline_nl2br             = baseline._string_nl2br;               //문자열중 줄바꿈문자를 HTML 줄바꿈 Tag로 변환하여 반환
String.prototype.baseline_formatnumber      = baseline._string_formatnumber;        //숫자로된 문자열에 3자리마다 콤마를 추가하여 반환
String.prototype.baseline_htmlspecialchars  = baseline._string_htmlspecialchars;    //특수 문자를 HTML 엔티티로 변환
String.prototype.baseline_striptags         = baseline._string_striptags;           //HTML Tag를 제거하고 반환
String.prototype.baseline_iindexOf          = baseline._string_iindexOf;            //대소문자를 가리지않고 부분 문자열이 처음 나오는 문자 위치를 반환
String.prototype.baseline_ilastIndexOf      = baseline._string_ilastIndexOf;        //대소문자를 가리지않고 부분 문자열이 마지막으로 나오는 문자 위치를 반환
String.prototype.baseline_isPattern         = baseline._string_isPattern;           //패턴 체크 후 Boolean 값 반환
String.prototype.baseline_onlyNumber        = baseline._string_onlyNumber;          //숫자만 허용

Date.prototype.baseline_format              = baseline._date_format;                //날짜형 포멧변환
String.prototype.string 					= function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf 						= function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf 						= function(len){return this.toString().zf(len);};


/* ******************** 커스텀 폼컨트롤 정의 ******************** */
baseline.CustomFile = function() {
	
	this.control            = {};
	
	this.element            = {};
	this.element.fileEl     = {};
	this.element.fileAdd    = {};
	this.element.fileDel    = {};
	this.element.fileName   = {};
	
	this.control.activeFile     = ( elementName )=>{
		this.element.fileEl     = document.getElementById(elementName);
	}
	this.control.activeFileAdd  = ( elementName )=>{
		this.element.fileAdd    = document.getElementById(elementName);
	}
	this.control.activeFileDel  = ( elementName )=>{
		this.element.fileDel    = document.getElementById(elementName);
	}
	this.control.activeFileName = ( elementName )=>{
		this.element.fileName   = document.getElementById(elementName);
	}
	this.control.setFileName    = ( fileName ) => {
		this.element.fileName.text = fileName;
	}
	
	this.init = ()=>{
		
		this.element.fileEl.addEventListener("change", ()=>{
			let fileName        = this.element.fileEl.value;
			let fileNameSimple  = fileName.substring(fileName.lastIndexOf("\\") + 1);
			this.control.setFileName( fileNameSimple );
		});
		
		this.element.fileAdd.addEventListener("click", ()=>{
			this.element.fileEl.click();
		});
		
		this.element.fileDel.addEventListener("click", ()=>{
			this.element.fileEl.value = "";
			this.control.setFileName("");
		});
/*
		this.element.fileDel.addEventListener("click", ()=>{
			this.element.fileDel.click();
		});
*/
	}
}
/* ---------- CustomFile 사용법 ----------
customFile_1  = new baseline.CustomFile();
customFile_1.control.activeFile(      "file_1");
customFile_1.control.activeFileAdd(   "fileAdd_1");
customFile_1.control.activeFileDel(   "fileDel_1");
customFile_1.control.activeFileName(  "fileName_1");
customFile_1.init();
*/

/* ******************** 커스텀 폼컨트롤 정의 ******************** */

/* ******************** jquery Ajax 공통 에러 정의 ******************** */
$.ajaxSetup({
	error: function (jqXHR, exception) {

		switch (jqXHR.status) {
			case 400 :
				baseline.alert("요청정보 오류입니다.\n관리자에게 문의해 주세요.", "CODE : 400");
				break;
			case 401 :
				baseline.alert("인증정보가 없습니다.\n로그인 후 이용해주세요.", "CODE : 401");
				break;
			case 403 :
				baseline.alert("페이지 이용 권한이 없습니다.\n관리자에게 문의해 주세요.", "CODE : 403");
				break;
			case 500 :
				baseline.alert("서비스가 원활하지 않습니다.\n잠시 후 다시 이용해주세요.", "CODE : 500");
				break;
		}
	}
})
/* ******************** 커스텀 폼컨트롤 정의 ******************** */

/* ******************** 엑셀 다운로드 ******************** */
baseline.excelDownload = function(
	apiUrl,
	apiData = null,
	apiMethod = "GET",
	downloadFileName = "sample.xlsx"
){
	
	var xhr 				= new XMLHttpRequest();
	xhr.open(apiMethod      , apiUrl);
	xhr.setRequestHeader(	"Content-Type", "application/x-www-form-urlencoded");
	xhr.responseType 		= "blob"; // !!필수!!
	xhr.onreadystatechange 	= function(){
		
		if (this.readyState === 4 && this.status === 200){
			
			var fileName 	= downloadFileName;
			var disposition = xhr.getResponseHeader("Content-Disposition");
			
			// console.log(this.response, typeof this.response);
			if (window.navigator.msSaveOrOpenBlob) { // IE 10+
				var blob 		= new Blob([this.response], { type: disposition });
				window.navigator.msSaveOrOpenBlob(blob, fileName);
				
			}else{
				var a 		= document.createElement("a");
				var url 	= URL.createObjectURL(this.response)
				a.href 		= url;
				a.download 	= fileName;
				
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			}
		}
	}
	xhr.send( apiData );
/*
	xhr.send( "param1="+param1_val+"&param2="+param2_val );
	xhr.send( $.param( getSearchObj(1) ));
	xhr.send( serialize(searchObj) );
	xhr.send( $("#form_search").serialize() );
*/
}
/* ******************** 엑셀 다운로드 ******************** */

baseline.noImage = function(el){
	el.src='/resources/__baseline/images/no-image.png';
}

baseline.deepCopy = function(o) {
	
	let result = {};
	
	if (typeof o === "object" && o !== null){
		for (let i in o) {
			result[i] = baseline.deepCopy(o[i]);
		}
	}else{
		result = o;
	}
	
	return result;
}
/**
 * 파일 다운로드 스크립트
 * @param _obj
 * @returns {Promise<void>}
 */
baseline.fnDownloadFile = async (_obj) => {
	const filePath      = $(_obj).attr('data-path');
	const fileName      = $(_obj).attr('data-name');
	const response      = await fetch(filePath);
	const arrayBuffer   = await response.arrayBuffer();
	const blob          = new Blob([arrayBuffer], { type: 'application/octet-stream' });
	const blobURL       = URL.createObjectURL(blob);
	const a             = document.createElement('a');
	a.href              = blobURL;
	a.style.display     = 'none';
	if (fileName && fileName.length) {
		a.download = fileName;
	}

	document.body.appendChild(a);
	a.click();
	a.remove();

}

/**
 * 쿠키 설정
 * @param _name
 * @param _value
 * @param _expireDays
 */
baseline.fnSetCookie = function (_name, _value, _expireDays){
	const todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + _expireDays);
	document.cookie = _name + "=" + escape(_value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}
/**
 * 쿠키 조회
 * @param _name
 * @returns {string}
 */
baseline.fnGetCookie = function (_name){
	const search = _name + "="
	if (document.cookie.length > 0) {  //  쿠키가  설정되어  있다면
		let offset = document.cookie.indexOf(search)
		if (offset != -1) {  //  쿠키가  존재하면
			offset += search.length
			let end = document.cookie.indexOf(";", offset)
			//  쿠키 값의  마지막  위치  인덱스  번호  설정
			if (end == -1)
				end = document.cookie.length
			return unescape(document.cookie.substring(offset, end))
		}
	}
	return "";
}
