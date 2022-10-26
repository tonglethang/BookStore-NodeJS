function paginationUrl(page) {
    var url = window.location.href;    
    if(url.toString().includes("page") == true){
        var pos = url.indexOf('page=');
        url1 = replaceAtIndex(url, pos + 5, page);
        window.location = url1;
    }
    else{
        if (url.indexOf('?') > -1){
            url += ('&page=' + page )
            window.location = url;
        }
        else{
            url += ('?page='+  page)
            window.location = url;
        }
    }
  }
  function replaceAtIndex(_string,_index,_newValue) {
    split_string = _string.substring(0, _index) + ' ' + _string.substring(_index + 1);
    return_string = split_string.split('');
    return_string[_index] = _newValue;
    return_string = return_string.join('');
    return return_string;
  }