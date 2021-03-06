(function($){'use strict';Drupal.behaviors.scanningServicesmap={attach:function(context,settings){var map
function popupTpl(value){var contentData='',statusRow='',status=value.status;switch(status){case"silver":statusRow='<div class="small-text stat '+status+'">'+status+'</div>';break;case"gold":statusRow='<div class="small-text stat '+status+'">'+status+'</div>';break;default:statusRow=""};if(value.logo)contentData+='<div class="logo">'+value.logo+'</div>';contentData+='<div class="reseller__description"><div class="title">'+value.title+'</div>'+statusRow+'<div class="address small-text">'+value.address+'</div></div>';return contentData};var getSvgPointIcon=function(){var encoded=window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="29" height="48" version="1"><g fill="none" fill-rule="nonzero"><path fill="#DC3E2A" d="M7 2L0 16l9 10h10l10-14-9-12z"/><path fill="#DC3E2A" d="M29 12L13 48 9 26z"/><path fill="#7E181C" d="M12 24L0 16l9 10z"/><path fill="#B5272D" d="M29 12l-4 3-12 33z"/><path fill="#9B1D23" d="M12 24l-3 2 4 22z"/></g></svg>');return('data:image/svg+xml;base64,'+encoded)},getSvgActivePointIcon=function(){var encoded=window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="35" height="59"><defs><filter x="-49.8%" y="-75%" width="199.7%" height="250%" filterUnits="objectBoundingBox" id="a"><feGaussianBlur stdDeviation="1.1" in="SourceGraphic"/></filter></defs><g transform="translate(2 2)" fill="none" fill-rule="evenodd"><path d="M9.866 29.117L-.654 17.134 7.022 1.14 22.43-.582l10.02 13.673-18.465 41.526-4.12-25.5z" stroke="#232326" stroke-width="1.1" fill="#232326" stroke-linejoin="round"/><ellipse fill="#1F201F" opacity=".4" filter="url(#a)" cx="14.345" cy="52.8" rx="3.31" ry="2.2"/><ellipse fill="#232326" cx="14.345" cy="52.8" rx="2.207" ry="1.1"/><path d="M31.82 13.159L14.233 52.705l-3.85-23.832L0 17.045 7.385 1.653 22.175 0l9.644 13.159zM16.551 19.8c3.047 0 5.517-2.462 5.517-5.5s-2.47-5.5-5.517-5.5-5.518 2.462-5.518 5.5 2.47 5.5 5.518 5.5z" fill="#DC3E2A"/><path fill="#7E181C" d="M13.475 26.78L.095 17.14l10.383 11.83z"/><path fill="#B5272D" d="M31.82 13.159l-4.206 3.365-13.38 36.181z"/><path fill="#9B1D23" d="M13.475 26.78l-2.997 2.188 3.756 23.737z"/><circle stroke="#232326" stroke-width="1.1" fill="#FFF" stroke-linejoin="round" cx="16" cy="14" r="6.55"/></g></svg>');return('data:image/svg+xml;base64,'+encoded)},ssSetPopupData=function(content){$('.ssMapPopup .content').html(content);$('.ssMapPopup').show()}
function addressMap(){var locations=Drupal.settings.artec_blocks.locations,user_position=false
function getUserPosition(){if('geolocation'in navigator){navigator.geolocation.getCurrentPosition(function(position){user_position={lat:position.coords.latitude,lng:position.coords.longitude};map.setCenter(user_position);return user_position})}else alert('Geolocation is not supported by your browser.')};getUserPosition();var map_init_set={};if('geolocation'in navigator){map_init_set={scrollwheel:true,disableDefaultUI:true,zoom:user_position?5:3,center:user_position||{lat:0,lng:0}}}else map_init_set={scrollwheel:true,disableDefaultUI:true,zoom:3,center:{lat:0,lng:0}};map=new google.maps.Map(document.getElementById("r-map"),map_init_set);var infowindow=new google.maps.InfoWindow({content:" "}),bounds=new google.maps.LatLngBounds(),markers=[];locations.forEach(function(value,index){var marker=new google.maps.Marker({position:{lat:value.lat,lng:value.lng},icon:getSvgPointIcon(),title:value.title,map:map});google.maps.event.addListener(marker,'click',function(){ssSetPopupData(popupTpl(value));$('form.webform-client-form input[name="submitted[partner_title]"]').val(value.title+'. Address:'+value.address);$('form.webform-client-form input[name="submitted[partner_id]"]').val(value.nid);$('form.webform-client-form input[name="submitted[service_type]"]').val(value.services);for(var j=0;j<markers.length;j++)markers[j].setIcon(getSvgPointIcon());this.setIcon(getSvgActivePointIcon())});markers.push(marker);var loc=new google.maps.LatLng(marker.position.lat(),marker.position.lng());bounds.extend(loc)});var cluster_styles=[{width:30,height:54,url:getSvgPointIcon(),anchor:[6,0],textColor:'white',textSize:14}],markerCluster=new MarkerClusterer(map,markers,{styles:cluster_styles}),opt={minZoom:3,maxZoom:19};map.setOptions(opt)};google.maps.event.addDomListener(window,'load',addressMap)
function toggleModalWindow(){var _block=$('.ssMapPopup');_block.once('toggleModalWindow-once').on('click','.request-btn',function(){_block.toggleClass('opened');$('body').toggleClass('ssMapPopup-opened')})};toggleModalWindow()
function closePopUp(){$(".services-map .close").click(function(){var _parent=$(this).closest('.ssMapPopup');switch(_parent.hasClass("opened")){case true:_parent.removeClass("opened");$('body').removeClass('ssMapPopup-opened');break;default:_parent.hide();break}})};closePopUp()}}}(jQuery));;/*})'"*/
(function($){Drupal.Views={};Drupal.behaviors.viewsTabs={attach:function(context){if($.viewsUi&&$.viewsUi.tabs)$('#views-tabset').once('views-processed').viewsTabs({selectedClass:'active'});$('a.views-remove-link').once('views-processed').click(function(event){var id=$(this).attr('id').replace('views-remove-link-','');$('#views-row-'+id).hide();$('#views-removed-'+id).attr('checked',true);event.preventDefault()});$('a.display-remove-link').addClass('display-processed').click(function(){var id=$(this).attr('id').replace('display-remove-link-','');$('#display-row-'+id).hide();$('#display-removed-'+id).attr('checked',true);return false})}};Drupal.Views.parseQueryString=function(query){var args={},pos=query.indexOf('?');if(pos!=-1)query=query.substring(pos+1);var pairs=query.split('&');for(var i in pairs)if(typeof(pairs[i])=='string'){var pair=pairs[i].split('=');if(pair[0]!='q'&&pair[1])args[decodeURIComponent(pair[0].replace(/\+/g,' '))]=decodeURIComponent(pair[1].replace(/\+/g,' '))};return args};Drupal.Views.parseViewArgs=function(href,viewPath){if(Drupal.settings.pathPrefix)var viewPath=Drupal.settings.pathPrefix+viewPath;var returnObj={},path=Drupal.Views.getPath(href);if(viewPath&&path.substring(0,viewPath.length+1)==viewPath+'/'){var args=decodeURIComponent(path.substring(viewPath.length+1,path.length));returnObj.view_args=args;returnObj.view_path=path};return returnObj};Drupal.Views.pathPortion=function(href){var protocol=window.location.protocol;if(href.substring(0,protocol.length)==protocol)href=href.substring(href.indexOf('/',protocol.length+2));return href};Drupal.Views.getPath=function(href){href=Drupal.Views.pathPortion(href);href=href.substring(Drupal.settings.basePath.length,href.length);if(href.substring(0,3)=='?q=')href=href.substring(3,href.length);var chars=['#','?','&'];for(var i in chars)if(href.indexOf(chars[i])>-1)href=href.substr(0,href.indexOf(chars[i]));return href}})(jQuery);;/*})'"*/
(function($){Drupal.behaviors.ViewsAjaxView={};Drupal.behaviors.ViewsAjaxView.attach=function(){if(Drupal.settings&&Drupal.settings.views&&Drupal.settings.views.ajaxViews)$.each(Drupal.settings.views.ajaxViews,function(i,settings){Drupal.views.instances[i]=new Drupal.views.ajaxView(settings)})};Drupal.views={};Drupal.views.instances={};Drupal.views.ajaxView=function(settings){var selector='.view-dom-id-'+settings.view_dom_id;this.$view=$(selector);var ajax_path=Drupal.settings.views.ajax_path;if(ajax_path.constructor.toString().indexOf("Array")!=-1)ajax_path=ajax_path[0];var queryString=window.location.search||'';if(queryString!==''){var queryString=queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/,'');if(queryString!=='')queryString=((/\?/.test(ajax_path))?'&':'?')+queryString};this.element_settings={url:ajax_path+queryString,submit:settings,setClick:true,event:'click',selector:selector,progress:{type:'throbber'}};this.settings=settings;this.$exposed_form=$('#views-exposed-form-'+settings.view_name.replace(/_/g,'-')+'-'+settings.view_display_id.replace(/_/g,'-'));this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax,this));this.links=[];this.$view.filter(jQuery.proxy(this.filterNestedViews,this)).once(jQuery.proxy(this.attachPagerAjax,this));var self_settings=this.element_settings;self_settings.event='RefreshView';this.refreshViewAjax=new Drupal.ajax(this.selector,this.$view,self_settings)};Drupal.views.ajaxView.prototype.attachExposedFormAjax=function(){var button=$('input[type=submit], button[type=submit], input[type=image]',this.$exposed_form);button=button[0];$(button).click(function(){if(Drupal.autocompleteSubmit)Drupal.autocompleteSubmit()});this.exposedFormAjax=new Drupal.ajax($(button).attr('id'),button,this.element_settings)};Drupal.views.ajaxView.prototype.filterNestedViews=function(){return!this.$view.parents('.view').length};Drupal.views.ajaxView.prototype.attachPagerAjax=function(){this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a').each(jQuery.proxy(this.attachPagerLinkAjax,this))};Drupal.views.ajaxView.prototype.attachPagerLinkAjax=function(id,link){var $link=$(link),viewData={},href=$link.attr('href');$.extend(viewData,this.settings,Drupal.Views.parseQueryString(href),Drupal.Views.parseViewArgs(href,this.settings.view_base_path));$.extend(viewData,Drupal.Views.parseViewArgs(href,this.settings.view_base_path));this.element_settings.submit=viewData;this.pagerAjax=new Drupal.ajax(false,$link,this.element_settings);this.links.push(this.pagerAjax)};Drupal.ajax.prototype.commands.viewsScrollTop=function(ajax,response,status){var offset=$(response.selector).offset(),scrollTarget=response.selector;while($(scrollTarget).scrollTop()==0&&$(scrollTarget).parent())scrollTarget=$(scrollTarget).parent();if(offset.top-10<$(scrollTarget).scrollTop())$(scrollTarget).animate({scrollTop:(offset.top-10)},500)}})(jQuery);;/*})'"*/
(function($){"use strict";Drupal.behaviors.webform=Drupal.behaviors.webform||{};Drupal.behaviors.webform.attach=function(context){Drupal.webform.datepicker(context);if(Drupal.settings.webform&&Drupal.settings.webform.conditionals)Drupal.webform.conditional(context)};Drupal.webform=Drupal.webform||{};Drupal.webform.datepicker=function(context){$('div.webform-datepicker').each(function(){var $webformDatepicker=$(this),$calendar=$webformDatepicker.find('input.webform-calendar');if($calendar.length==0)return;var startDate=$calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/,'$1').split('-'),endDate=$calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/,'$1').split('-'),firstDay=$calendar[0].className.replace(/.*webform-calendar-day-(\d).*/,'$1');startDate=new Date(startDate[0],startDate[1]-1,startDate[2]);endDate=new Date(endDate[0],endDate[1]-1,endDate[2]);if(startDate>endDate){var laterDate=startDate;startDate=endDate;endDate=laterDate};var startYear=startDate.getFullYear(),endYear=endDate.getFullYear();$calendar.datepicker({dateFormat:'yy-mm-dd',yearRange:startYear+':'+endYear,firstDay:parseInt(firstDay),minDate:startDate,maxDate:endDate,onSelect:function(dateText,inst){var date=dateText.split('-');$webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');$webformDatepicker.find('select.month').val(+date[1]).trigger('change');$webformDatepicker.find('select.day').val(+date[2]).trigger('change')},beforeShow:function(input,inst){var year=$webformDatepicker.find('select.year, input.year').val(),month=$webformDatepicker.find('select.month').val(),day=$webformDatepicker.find('select.day').val(),today=new Date();year=year?year:today.getFullYear();month=month?month:today.getMonth()+1;day=day?day:today.getDate();year=(year<startYear||year>endYear)?startYear:year;$(input).val(year+'-'+month+'-'+day)}});$calendar.click(function(event){$(this).focus();event.preventDefault()})})};Drupal.webform.conditional=function(context){$.each(Drupal.settings.webform.conditionals,function(formKey,settings){var $form=$('.'+formKey+':not(.webform-conditional-processed)');$form.each(function(index,currentForm){var $currentForm=$(currentForm);$currentForm.addClass('webform-conditional-processed');$currentForm.bind('change',{settings:settings},Drupal.webform.conditionalCheck);Drupal.webform.doConditions($currentForm,settings)})})};Drupal.webform.conditionalCheck=function(e){var $triggerElement=$(e.target).closest('.webform-component'),$form=$triggerElement.closest('form'),triggerElementKey=$triggerElement.attr('class').match(/webform-component--[^ ]+/)[0],settings=e.data.settings;if(settings.sourceMap[triggerElementKey])Drupal.webform.doConditions($form,settings)};Drupal.webform.doConditions=function($form,settings){var stackPointer,resultStack
function executionStackInitialize(andor){stackPointer=-1;resultStack=[];executionStackPush(andor)}
function executionStackPush(andor){resultStack[++stackPointer]={results:[],andor:andor}}
function executionStackAccumulate(result){resultStack[stackPointer]['results'].push(result)}
function executionStackPop(){var stackFrame=resultStack[stackPointer];stackPointer=Math.max(0,stackPointer-1);var $conditionalResults=stackFrame.results,filteredResults=$.map($conditionalResults,function(val){return val?val:null});return stackFrame.andor==='or'?filteredResults.length>0:filteredResults.length===$conditionalResults.length};$.each(settings.ruleGroups,function(rgid_key,rule_group){var ruleGroup=settings.ruleGroups[rgid_key];executionStackInitialize(ruleGroup.andor);$.each(ruleGroup.rules,function(m,rule){switch(rule.source_type){case'component':var elementKey=rule.source,element=$form.find('.'+elementKey)[0],existingValue=settings.values[elementKey]?settings.values[elementKey]:null;executionStackAccumulate(window.Drupal['webform'][rule.callback](element,existingValue,rule.value));break;case'conditional_start':executionStackPush(rule.andor);break;case'conditional_end':executionStackAccumulate(executionStackPop());break}});var conditionalResult=executionStackPop();$.each(ruleGroup.actions,function(aid,action){var $target=$form.find('.'+action.target),actionResult=action.invert?!conditionalResult:conditionalResult;switch(action.action){case'show':var changed=actionResult!=Drupal.webform.isVisible($target);if(actionResult){$target.find('.webform-conditional-disabled:not(.webform-disabled-flag)').removeClass('webform-conditional-disabled').webformProp('disabled',false);$target.removeClass('webform-conditional-hidden').show();$form.find('.chosen-disabled').prev().trigger('chosen:updated.chosen')}else $target.hide().addClass('webform-conditional-hidden').find(':input').addClass('webform-conditional-disabled webform-disabled-flag').webformProp('disabled',true);if(changed&&$target.is('tr'))Drupal.webform.restripeTable($target.closest('table').first());break;case'require':var $requiredSpan=$target.find('.form-required, .form-optional').first();if(actionResult!=$requiredSpan.hasClass('form-required')){var $targetInputElements=$target.find("input:text,textarea,input[type='email'],select,input:radio,input:file");Drupal.detachBehaviors($requiredSpan);$targetInputElements.webformProp('required',actionResult).toggleClass('required',actionResult);if(actionResult){$requiredSpan.replaceWith('<span class="form-required" title="'+Drupal.t('This field is required.')+'">*</span>')}else $requiredSpan.replaceWith('<span class="form-optional"></span>');Drupal.attachBehaviors($requiredSpan)};break;case'set':var $texts=$target.find("input:text,textarea,input[type='email']"),$selects=$target.find('select,select option,input:radio,input:checkbox'),$markups=$target.filter('.webform-component-markup');if(actionResult){var multiple=$.map(action.argument.split(','),$.trim);$selects.webformVal(multiple).webformProp('disabled',true).addClass('webform-disabled-flag');$texts.val([action.argument]).webformProp('readonly',true).addClass('webform-disabled-flag');$markups.html(action.argument)}else{$selects.not('.webform-disabled-flag').webformProp('disabled',false);$texts.not('.webform-disabled-flag').webformProp('readonly',false);$markups.each(function(){var $this=$(this),original=$this.data('webform-markup');if(original!==undefined)$this.html(original)})};break}})});$form.find('.webform-disabled-flag').removeClass('webform-disabled-flag')};Drupal.webform.stopEvent=function(){return false};Drupal.webform.conditionalOperatorStringEqual=function(element,existingValue,ruleValue){var returnValue=false,currentValue=Drupal.webform.stringValue(element,existingValue);$.each(currentValue,function(n,value){if(value.toLowerCase()===ruleValue.toLowerCase()){returnValue=true;return false}});return returnValue};Drupal.webform.conditionalOperatorStringNotEqual=function(element,existingValue,ruleValue){var found=false,currentValue=Drupal.webform.stringValue(element,existingValue);$.each(currentValue,function(n,value){if(value.toLowerCase()===ruleValue.toLowerCase())found=true});return!found};Drupal.webform.conditionalOperatorStringContains=function(element,existingValue,ruleValue){var returnValue=false,currentValue=Drupal.webform.stringValue(element,existingValue);$.each(currentValue,function(n,value){if(value.toLowerCase().indexOf(ruleValue.toLowerCase())>-1){returnValue=true;return false}});return returnValue};Drupal.webform.conditionalOperatorStringDoesNotContain=function(element,existingValue,ruleValue){var found=false,currentValue=Drupal.webform.stringValue(element,existingValue);$.each(currentValue,function(n,value){if(value.toLowerCase().indexOf(ruleValue.toLowerCase())>-1)found=true});return!found};Drupal.webform.conditionalOperatorStringBeginsWith=function(element,existingValue,ruleValue){var returnValue=false,currentValue=Drupal.webform.stringValue(element,existingValue);$.each(currentValue,function(n,value){if(value.toLowerCase().indexOf(ruleValue.toLowerCase())===0){returnValue=true;return false}});return returnValue};Drupal.webform.conditionalOperatorStringEndsWith=function(element,existingValue,ruleValue){var returnValue=false,currentValue=Drupal.webform.stringValue(element,existingValue);$.each(currentValue,function(n,value){if(value.toLowerCase().lastIndexOf(ruleValue.toLowerCase())===value.length-ruleValue.length){returnValue=true;return false}});return returnValue};Drupal.webform.conditionalOperatorStringEmpty=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue),returnValue=true;$.each(currentValue,function(n,value){if(value!==''){returnValue=false;return false}});return returnValue};Drupal.webform.conditionalOperatorStringNotEmpty=function(element,existingValue,ruleValue){return!Drupal.webform.conditionalOperatorStringEmpty(element,existingValue,ruleValue)};Drupal.webform.conditionalOperatorSelectGreaterThan=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue);return Drupal.webform.compare_select(currentValue[0],ruleValue,element)>0};Drupal.webform.conditionalOperatorSelectGreaterThanEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue),comparison=Drupal.webform.compare_select(currentValue[0],ruleValue,element);return comparison>0||comparison===0};Drupal.webform.conditionalOperatorSelectLessThan=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue);return Drupal.webform.compare_select(currentValue[0],ruleValue,element)<0};Drupal.webform.conditionalOperatorSelectLessThanEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue),comparison=Drupal.webform.compare_select(currentValue[0],ruleValue,element);return comparison<0||comparison===0};Drupal.webform.conditionalOperatorNumericEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue),epsilon=0.000001;return currentValue[0]===''?false:(Math.abs(parseFloat(currentValue[0])-parseFloat(ruleValue))<epsilon)};Drupal.webform.conditionalOperatorNumericNotEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue),epsilon=0.000001;return currentValue[0]===''?true:(Math.abs(parseFloat(currentValue[0])-parseFloat(ruleValue))>=epsilon)};Drupal.webform.conditionalOperatorNumericGreaterThan=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue);return parseFloat(currentValue[0])>parseFloat(ruleValue)};Drupal.webform.conditionalOperatorNumericGreaterThanEqual=function(element,existingValue,ruleValue){return Drupal.webform.conditionalOperatorNumericGreaterThan(element,existingValue,ruleValue)||Drupal.webform.conditionalOperatorNumericEqual(element,existingValue,ruleValue)};Drupal.webform.conditionalOperatorNumericLessThan=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.stringValue(element,existingValue);return parseFloat(currentValue[0])<parseFloat(ruleValue)};Drupal.webform.conditionalOperatorNumericLessThanEqual=function(element,existingValue,ruleValue){return Drupal.webform.conditionalOperatorNumericLessThan(element,existingValue,ruleValue)||Drupal.webform.conditionalOperatorNumericEqual(element,existingValue,ruleValue)};Drupal.webform.conditionalOperatorDateEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.dateValue(element,existingValue);return currentValue===ruleValue};Drupal.webform.conditionalOperatorDateNotEqual=function(element,existingValue,ruleValue){return!Drupal.webform.conditionalOperatorDateEqual(element,existingValue,ruleValue)};Drupal.webform.conditionalOperatorDateBefore=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.dateValue(element,existingValue);return(currentValue!==false)&&currentValue<ruleValue};Drupal.webform.conditionalOperatorDateBeforeEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.dateValue(element,existingValue);return(currentValue!==false)&&(currentValue<ruleValue||currentValue===ruleValue)};Drupal.webform.conditionalOperatorDateAfter=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.dateValue(element,existingValue);return(currentValue!==false)&&currentValue>ruleValue};Drupal.webform.conditionalOperatorDateAfterEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.dateValue(element,existingValue);return(currentValue!==false)&&(currentValue>ruleValue||currentValue===ruleValue)};Drupal.webform.conditionalOperatorTimeEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.timeValue(element,existingValue);return currentValue===ruleValue};Drupal.webform.conditionalOperatorTimeNotEqual=function(element,existingValue,ruleValue){return!Drupal.webform.conditionalOperatorTimeEqual(element,existingValue,ruleValue)};Drupal.webform.conditionalOperatorTimeBefore=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.timeValue(element,existingValue);return(currentValue!==false)&&(currentValue<ruleValue)};Drupal.webform.conditionalOperatorTimeBeforeEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.timeValue(element,existingValue);return(currentValue!==false)&&(currentValue<ruleValue||currentValue===ruleValue)};Drupal.webform.conditionalOperatorTimeAfter=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.timeValue(element,existingValue);return(currentValue!==false)&&(currentValue>ruleValue)};Drupal.webform.conditionalOperatorTimeAfterEqual=function(element,existingValue,ruleValue){var currentValue=Drupal.webform.timeValue(element,existingValue);return(currentValue!==false)&&(currentValue>ruleValue||currentValue===ruleValue)};Drupal.webform.compare_select=function(a,b,element){var optionList=[];$('option,input:radio,input:checkbox',element).each(function(){optionList.push($(this).val())});var a_position=optionList.indexOf(a),b_position=optionList.indexOf(b);return(a_position<0||b_position<0)?null:a_position-b_position};Drupal.webform.isVisible=function($element){return $element.hasClass('webform-component-hidden')?!$element.find('input').first().hasClass('webform-conditional-disabled'):$element.closest('.webform-conditional-hidden').length==0};Drupal.webform.stringValue=function(element,existingValue){var value=[];if(element){var $element=$(element);if(Drupal.webform.isVisible($element)){$element.find('input[type=checkbox]:checked,input[type=radio]:checked').each(function(){value.push(this.value)});if(!value.length){var selectValue=$element.find('select').val();if(selectValue)if($.isArray(selectValue)){value=selectValue}else value.push(selectValue)};if(!value.length)$element.find('input:not([type=checkbox],[type=radio]),textarea').each(function(){value.push(this.value)})}}else switch($.type(existingValue)){case'array':value=existingValue;break;case'string':value.push(existingValue);break};return value};Drupal.webform.dateValue=function(element,existingValue){var value=false;if(element){var $element=$(element);if(Drupal.webform.isVisible($element)){var day=$element.find('[name*=day]').val(),month=$element.find('[name*=month]').val(),year=$element.find('[name*=year]').val();if(month)month--;if(year!==''&&month!==''&&day!=='')value=Date.UTC(year,month,day)/1e3}}else{if($.type(existingValue)==='array'&&existingValue.length)existingValue=existingValue[0];if($.type(existingValue)==='string')existingValue=existingValue.split('-');if(existingValue.length===3)value=Date.UTC(existingValue[0],existingValue[1],existingValue[2])/1e3};return value};Drupal.webform.timeValue=function(element,existingValue){var value=false;if(element){var $element=$(element);if(Drupal.webform.isVisible($element)){var hour=$element.find('[name*=hour]').val(),minute=$element.find('[name*=minute]').val(),ampm=$element.find('[name*=ampm]:checked').val();hour=(hour==='')?hour:parseInt(hour);minute=(minute==='')?minute:parseInt(minute);if(hour!==''){hour=(hour<12&&ampm=='pm')?hour+12:hour;hour=(hour===12&&ampm=='am')?0:hour};if(hour!==''&&minute!=='')value=Date.UTC(1970,0,1,hour,minute)/1e3}}else{if($.type(existingValue)==='array'&&existingValue.length)existingValue=existingValue[0];if($.type(existingValue)==='string')existingValue=existingValue.split(':');if(existingValue.length>=2)value=Date.UTC(1970,0,1,existingValue[0],existingValue[1])/1e3};return value};$.fn.webformProp=$.fn.webformProp||function(name,value){if(value){return $.fn.prop?this.prop(name,true):this.attr(name,true)}else return $.fn.prop?this.prop(name,false):this.removeAttr(name)};$.fn.webformVal=function(values){this.each(function(){var $this=$(this),value=$this.val(),on=$.inArray($this.val(),values)!=-1;if(this.nodeName=='OPTION'){$this.webformProp('selected',on?value:false)}else $this.val(on?[value]:false)});return this};Drupal.webform.restripeTable=function(table){$('> tbody > tr, > tr',table).filter(':visible:odd').filter('.odd').removeClass('odd').addClass('even').end().end().filter(':visible:even').filter('.even').removeClass('even').addClass('odd')}})(jQuery);;/*})'"*/
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=8be10479007f1f0b70b6)
 * Config saved to config.json and https://gist.github.com/8be10479007f1f0b70b6
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),n=i.data("bs.tab");n||i.data("bs.tab",n=new s(this)),"string"==typeof e&&n[e]()})}var s=function(e){this.element=t(e)};s.VERSION="3.3.5",s.TRANSITION_DURATION=150,s.prototype.show=function(){var e=this.element,s=e.closest("ul:not(.dropdown-menu)"),i=e.data("target");if(i||(i=e.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var n=s.find(".active:last a"),r=t.Event("hide.bs.tab",{relatedTarget:e[0]}),a=t.Event("show.bs.tab",{relatedTarget:n[0]});if(n.trigger(r),e.trigger(a),!a.isDefaultPrevented()&&!r.isDefaultPrevented()){var o=t(i);this.activate(e.closest("li"),s),this.activate(o,o.parent(),function(){n.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:n[0]})})}}},s.prototype.activate=function(e,i,n){function r(){a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),o?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),n&&n()}var a=i.find("> .active"),o=n&&t.support.transition&&(a.length&&a.hasClass("fade")||!!i.find("> .fade").length);a.length&&o?a.one("bsTransitionEnd",r).emulateTransitionEnd(s.TRANSITION_DURATION):r(),a.removeClass("in")};var i=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=s,t.fn.tab.noConflict=function(){return t.fn.tab=i,this};var n=function(s){s.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',n).on("click.bs.tab.data-api",'[data-toggle="pill"]',n)}(jQuery),+function(t){"use strict";function e(s,i){this.$body=t(document.body),this.$scrollElement=t(t(s).is(document.body)?window:s),this.options=t.extend({},e.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function s(s){return this.each(function(){var i=t(this),n=i.data("bs.scrollspy"),r="object"==typeof s&&s;n||i.data("bs.scrollspy",n=new e(this,r)),"string"==typeof s&&n[s]()})}e.VERSION="3.3.5",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,s="offset",i=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(s="position",i=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),n=e.data("target")||e.attr("href"),r=/^#./.test(n)&&t(n);return r&&r.length&&r.is(":visible")&&[[r[s]().top+i,n]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,s=this.getScrollHeight(),i=this.options.offset+s-this.$scrollElement.height(),n=this.offsets,r=this.targets,a=this.activeTarget;if(this.scrollHeight!=s&&this.refresh(),e>=i)return a!=(t=r[r.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=r[t]&&e>=n[t]&&(void 0===n[t+1]||e<n[t+1])&&this.activate(r[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var s=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',i=t(s).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var i=t.fn.scrollspy;t.fn.scrollspy=s,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);s.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var s in e)if(void 0!==t.style[s])return{end:e[s]};return!1}t.fn.emulateTransitionEnd=function(e){var s=!1,i=this;t(this).one("bsTransitionEnd",function(){s=!0});var n=function(){s||t(i).trigger(t.support.transition.end)};return setTimeout(n,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery);
;/*})'"*/
;/*})'"*/
/* Chosen v1.8.7 | (c) 2011-2018 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */

(function(){var t,e,s,i,n=function(t,e){return function(){return t.apply(e,arguments)}},r=function(t,e){function s(){this.constructor=t}for(var i in e)o.call(e,i)&&(t[i]=e[i]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},o={}.hasOwnProperty;(i=function(){function t(){this.options_index=0,this.parsed=[]}return t.prototype.add_node=function(t){return"OPTGROUP"===t.nodeName.toUpperCase()?this.add_group(t):this.add_option(t)},t.prototype.add_group=function(t){var e,s,i,n,r,o;for(e=this.parsed.length,this.parsed.push({array_index:e,group:!0,label:t.label,title:t.title?t.title:void 0,children:0,disabled:t.disabled,classes:t.className}),o=[],s=0,i=(r=t.childNodes).length;s<i;s++)n=r[s],o.push(this.add_option(n,e,t.disabled));return o},t.prototype.add_option=function(t,e,s){if("OPTION"===t.nodeName.toUpperCase())return""!==t.text?(null!=e&&(this.parsed[e].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:t.value,text:t.text,html:t.innerHTML,title:t.title?t.title:void 0,selected:t.selected,disabled:!0===s?s:t.disabled,group_array_index:e,group_label:null!=e?this.parsed[e].label:null,classes:t.className,style:t.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1},t}()).select_to_array=function(t){var e,s,n,r,o;for(r=new i,s=0,n=(o=t.childNodes).length;s<n;s++)e=o[s],r.add_node(e);return r.parsed},e=function(){function t(e,s){this.form_field=e,this.options=null!=s?s:{},this.label_click_handler=n(this.label_click_handler,this),t.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers(),this.on_ready())}return t.prototype.set_default_values=function(){return this.click_test_action=function(t){return function(e){return t.test_active_click(e)}}(this),this.activate_action=function(t){return function(e){return t.activate_field(e)}}(this),this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.is_rtl=this.options.rtl||/\bchosen-rtl\b/.test(this.form_field.className),this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text&&this.options.allow_single_deselect,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null==this.options.enable_split_word_search||this.options.enable_split_word_search,this.group_search=null==this.options.group_search||this.options.group_search,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null==this.options.single_backstroke_delete||this.options.single_backstroke_delete,this.max_selected_options=this.options.max_selected_options||Infinity,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null==this.options.display_selected_options||this.options.display_selected_options,this.display_disabled_options=null==this.options.display_disabled_options||this.options.display_disabled_options,this.include_group_label_in_selected=this.options.include_group_label_in_selected||!1,this.max_shown_results=this.options.max_shown_results||Number.POSITIVE_INFINITY,this.case_sensitive_search=this.options.case_sensitive_search||!1,this.hide_results_on_select=null==this.options.hide_results_on_select||this.options.hide_results_on_select},t.prototype.set_default_text=function(){return this.form_field.getAttribute("data-placeholder")?this.default_text=this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.default_text=this.options.placeholder_text_multiple||this.options.placeholder_text||t.default_multiple_text:this.default_text=this.options.placeholder_text_single||this.options.placeholder_text||t.default_single_text,this.default_text=this.escape_html(this.default_text),this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||t.default_no_result_text},t.prototype.choice_label=function(t){return this.include_group_label_in_selected&&null!=t.group_label?"<b class='group-name'>"+this.escape_html(t.group_label)+"</b>"+t.html:t.html},t.prototype.mouse_enter=function(){return this.mouse_on_container=!0},t.prototype.mouse_leave=function(){return this.mouse_on_container=!1},t.prototype.input_focus=function(t){if(this.is_multiple){if(!this.active_field)return setTimeout(function(t){return function(){return t.container_mousedown()}}(this),50)}else if(!this.active_field)return this.activate_field()},t.prototype.input_blur=function(t){if(!this.mouse_on_container)return this.active_field=!1,setTimeout(function(t){return function(){return t.blur_test()}}(this),100)},t.prototype.label_click_handler=function(t){return this.is_multiple?this.container_mousedown(t):this.activate_field()},t.prototype.results_option_build=function(t){var e,s,i,n,r,o,h;for(e="",h=0,n=0,r=(o=this.results_data).length;n<r&&(s=o[n],i="",""!==(i=s.group?this.result_add_group(s):this.result_add_option(s))&&(h++,e+=i),(null!=t?t.first:void 0)&&(s.selected&&this.is_multiple?this.choice_build(s):s.selected&&!this.is_multiple&&this.single_set_selected_text(this.choice_label(s))),!(h>=this.max_shown_results));n++);return e},t.prototype.result_add_option=function(t){var e,s;return t.search_match&&this.include_option_in_results(t)?(e=[],t.disabled||t.selected&&this.is_multiple||e.push("active-result"),!t.disabled||t.selected&&this.is_multiple||e.push("disabled-result"),t.selected&&e.push("result-selected"),null!=t.group_array_index&&e.push("group-option"),""!==t.classes&&e.push(t.classes),s=document.createElement("li"),s.className=e.join(" "),t.style&&(s.style.cssText=t.style),s.setAttribute("data-option-array-index",t.array_index),s.innerHTML=t.highlighted_html||t.html,t.title&&(s.title=t.title),this.outerHTML(s)):""},t.prototype.result_add_group=function(t){var e,s;return(t.search_match||t.group_match)&&t.active_options>0?((e=[]).push("group-result"),t.classes&&e.push(t.classes),s=document.createElement("li"),s.className=e.join(" "),s.innerHTML=t.highlighted_html||this.escape_html(t.label),t.title&&(s.title=t.title),this.outerHTML(s)):""},t.prototype.results_update_field=function(){if(this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing)return this.winnow_results()},t.prototype.reset_single_select_options=function(){var t,e,s,i,n;for(n=[],t=0,e=(s=this.results_data).length;t<e;t++)(i=s[t]).selected?n.push(i.selected=!1):n.push(void 0);return n},t.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},t.prototype.results_search=function(t){return this.results_showing?this.winnow_results():this.results_show()},t.prototype.winnow_results=function(t){var e,s,i,n,r,o,h,l,c,_,a,u,d,p,f;for(this.no_results_clear(),_=0,e=(h=this.get_search_text()).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),c=this.get_search_regex(e),i=0,n=(l=this.results_data).length;i<n;i++)(r=l[i]).search_match=!1,a=null,u=null,r.highlighted_html="",this.include_option_in_results(r)&&(r.group&&(r.group_match=!1,r.active_options=0),null!=r.group_array_index&&this.results_data[r.group_array_index]&&(0===(a=this.results_data[r.group_array_index]).active_options&&a.search_match&&(_+=1),a.active_options+=1),f=r.group?r.label:r.text,r.group&&!this.group_search||(u=this.search_string_match(f,c),r.search_match=null!=u,r.search_match&&!r.group&&(_+=1),r.search_match?(h.length&&(d=u.index,o=f.slice(0,d),s=f.slice(d,d+h.length),p=f.slice(d+h.length),r.highlighted_html=this.escape_html(o)+"<em>"+this.escape_html(s)+"</em>"+this.escape_html(p)),null!=a&&(a.group_match=!0)):null!=r.group_array_index&&this.results_data[r.group_array_index].search_match&&(r.search_match=!0)));return this.result_clear_highlight(),_<1&&h.length?(this.update_results_content(""),this.no_results(h)):(this.update_results_content(this.results_option_build()),(null!=t?t.skip_highlight:void 0)?void 0:this.winnow_results_set_highlight())},t.prototype.get_search_regex=function(t){var e,s;return s=this.search_contains?t:"(^|\\s|\\b)"+t+"[^\\s]*",this.enable_split_word_search||this.search_contains||(s="^"+s),e=this.case_sensitive_search?"":"i",new RegExp(s,e)},t.prototype.search_string_match=function(t,e){var s;return s=e.exec(t),!this.search_contains&&(null!=s?s[1]:void 0)&&(s.index+=1),s},t.prototype.choices_count=function(){var t,e,s;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,t=0,e=(s=this.form_field.options).length;t<e;t++)s[t].selected&&(this.selected_option_count+=1);return this.selected_option_count},t.prototype.choices_click=function(t){if(t.preventDefault(),this.activate_field(),!this.results_showing&&!this.is_disabled)return this.results_show()},t.prototype.keydown_checker=function(t){var e,s;switch(s=null!=(e=t.which)?e:t.keyCode,this.search_field_scale(),8!==s&&this.pending_backstroke&&this.clear_backstroke(),s){case 8:this.backstroke_length=this.get_search_field_value().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(t),this.mouse_on_container=!1;break;case 13:case 27:this.results_showing&&t.preventDefault();break;case 32:this.disable_search&&t.preventDefault();break;case 38:t.preventDefault(),this.keyup_arrow();break;case 40:t.preventDefault(),this.keydown_arrow()}},t.prototype.keyup_checker=function(t){var e,s;switch(s=null!=(e=t.which)?e:t.keyCode,this.search_field_scale(),s){case 8:this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0?this.keydown_backstroke():this.pending_backstroke||(this.result_clear_highlight(),this.results_search());break;case 13:t.preventDefault(),this.results_showing&&this.result_select(t);break;case 27:this.results_showing&&this.results_hide();break;case 9:case 16:case 17:case 18:case 38:case 40:case 91:break;default:this.results_search()}},t.prototype.clipboard_event_checker=function(t){if(!this.is_disabled)return setTimeout(function(t){return function(){return t.results_search()}}(this),50)},t.prototype.container_width=function(){return null!=this.options.width?this.options.width:this.form_field.offsetWidth+"px"},t.prototype.include_option_in_results=function(t){return!(this.is_multiple&&!this.display_selected_options&&t.selected)&&(!(!this.display_disabled_options&&t.disabled)&&!t.empty)},t.prototype.search_results_touchstart=function(t){return this.touch_started=!0,this.search_results_mouseover(t)},t.prototype.search_results_touchmove=function(t){return this.touch_started=!1,this.search_results_mouseout(t)},t.prototype.search_results_touchend=function(t){if(this.touch_started)return this.search_results_mouseup(t)},t.prototype.outerHTML=function(t){var e;return t.outerHTML?t.outerHTML:((e=document.createElement("div")).appendChild(t),e.innerHTML)},t.prototype.get_single_html=function(){return'<a class="chosen-single chosen-default">\n  <span>'+this.default_text+'</span>\n  <div><b></b></div>\n</a>\n<div class="chosen-drop">\n  <div class="chosen-search">\n    <input class="chosen-search-input" type="text" autocomplete="off" />\n  </div>\n  <ul class="chosen-results"></ul>\n</div>'},t.prototype.get_multi_html=function(){return'<ul class="chosen-choices">\n  <li class="search-field">\n    <input class="chosen-search-input" type="text" autocomplete="off" value="'+this.default_text+'" />\n  </li>\n</ul>\n<div class="chosen-drop">\n  <ul class="chosen-results"></ul>\n</div>'},t.prototype.get_no_results_html=function(t){return'<li class="no-results">\n  '+this.results_none_found+" <span>"+this.escape_html(t)+"</span>\n</li>"},t.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:!(/iP(od|hone)/i.test(window.navigator.userAgent)||/IEMobile/i.test(window.navigator.userAgent)||/Windows Phone/i.test(window.navigator.userAgent)||/BlackBerry/i.test(window.navigator.userAgent)||/BB10/i.test(window.navigator.userAgent)||/Android.*Mobile/i.test(window.navigator.userAgent))},t.default_multiple_text="Select Some Options",t.default_single_text="Select an Option",t.default_no_result_text="No results match",t}(),(t=jQuery).fn.extend({chosen:function(i){return e.browser_is_supported()?this.each(function(e){var n,r;r=(n=t(this)).data("chosen"),"destroy"!==i?r instanceof s||n.data("chosen",new s(this,i)):r instanceof s&&r.destroy()}):this}}),s=function(s){function n(){return n.__super__.constructor.apply(this,arguments)}return r(n,e),n.prototype.setup=function(){return this.form_field_jq=t(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex},n.prototype.set_up_html=function(){var e,s;return(e=["chosen-container"]).push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&e.push(this.form_field.className),this.is_rtl&&e.push("chosen-rtl"),s={"class":e.join(" "),title:this.form_field.title},this.form_field.id.length&&(s.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=t("<div />",s),this.container.width(this.container_width()),this.is_multiple?this.container.html(this.get_multi_html()):this.container.html(this.get_single_html()),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior()},n.prototype.on_ready=function(){return this.form_field_jq.trigger("chosen:ready",{chosen:this})},n.prototype.register_observers=function(){return this.container.on("touchstart.chosen",function(t){return function(e){t.container_mousedown(e)}}(this)),this.container.on("touchend.chosen",function(t){return function(e){t.container_mouseup(e)}}(this)),this.container.on("mousedown.chosen",function(t){return function(e){t.container_mousedown(e)}}(this)),this.container.on("mouseup.chosen",function(t){return function(e){t.container_mouseup(e)}}(this)),this.container.on("mouseenter.chosen",function(t){return function(e){t.mouse_enter(e)}}(this)),this.container.on("mouseleave.chosen",function(t){return function(e){t.mouse_leave(e)}}(this)),this.search_results.on("mouseup.chosen",function(t){return function(e){t.search_results_mouseup(e)}}(this)),this.search_results.on("mouseover.chosen",function(t){return function(e){t.search_results_mouseover(e)}}(this)),this.search_results.on("mouseout.chosen",function(t){return function(e){t.search_results_mouseout(e)}}(this)),this.search_results.on("mousewheel.chosen DOMMouseScroll.chosen",function(t){return function(e){t.search_results_mousewheel(e)}}(this)),this.search_results.on("touchstart.chosen",function(t){return function(e){t.search_results_touchstart(e)}}(this)),this.search_results.on("touchmove.chosen",function(t){return function(e){t.search_results_touchmove(e)}}(this)),this.search_results.on("touchend.chosen",function(t){return function(e){t.search_results_touchend(e)}}(this)),this.form_field_jq.on("chosen:updated.chosen",function(t){return function(e){t.results_update_field(e)}}(this)),this.form_field_jq.on("chosen:activate.chosen",function(t){return function(e){t.activate_field(e)}}(this)),this.form_field_jq.on("chosen:open.chosen",function(t){return function(e){t.container_mousedown(e)}}(this)),this.form_field_jq.on("chosen:close.chosen",function(t){return function(e){t.close_field(e)}}(this)),this.search_field.on("blur.chosen",function(t){return function(e){t.input_blur(e)}}(this)),this.search_field.on("keyup.chosen",function(t){return function(e){t.keyup_checker(e)}}(this)),this.search_field.on("keydown.chosen",function(t){return function(e){t.keydown_checker(e)}}(this)),this.search_field.on("focus.chosen",function(t){return function(e){t.input_focus(e)}}(this)),this.search_field.on("cut.chosen",function(t){return function(e){t.clipboard_event_checker(e)}}(this)),this.search_field.on("paste.chosen",function(t){return function(e){t.clipboard_event_checker(e)}}(this)),this.is_multiple?this.search_choices.on("click.chosen",function(t){return function(e){t.choices_click(e)}}(this)):this.container.on("click.chosen",function(t){t.preventDefault()})},n.prototype.destroy=function(){return t(this.container[0].ownerDocument).off("click.chosen",this.click_test_action),this.form_field_label.length>0&&this.form_field_label.off("click.chosen"),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},n.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field.disabled||this.form_field_jq.parents("fieldset").is(":disabled"),this.container.toggleClass("chosen-disabled",this.is_disabled),this.search_field[0].disabled=this.is_disabled,this.is_multiple||this.selected_item.off("focus.chosen",this.activate_field),this.is_disabled?this.close_field():this.is_multiple?void 0:this.selected_item.on("focus.chosen",this.activate_field)},n.prototype.container_mousedown=function(e){var s;if(!this.is_disabled)return!e||"mousedown"!==(s=e.type)&&"touchstart"!==s||this.results_showing||e.preventDefault(),null!=e&&t(e.target).hasClass("search-choice-close")?void 0:(this.active_field?this.is_multiple||!e||t(e.target)[0]!==this.selected_item[0]&&!t(e.target).parents("a.chosen-single").length||(e.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),t(this.container[0].ownerDocument).on("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},n.prototype.container_mouseup=function(t){if("ABBR"===t.target.nodeName&&!this.is_disabled)return this.results_reset(t)},n.prototype.search_results_mousewheel=function(t){var e;if(t.originalEvent&&(e=t.originalEvent.deltaY||-t.originalEvent.wheelDelta||t.originalEvent.detail),null!=e)return t.preventDefault(),"DOMMouseScroll"===t.type&&(e*=40),this.search_results.scrollTop(e+this.search_results.scrollTop())},n.prototype.blur_test=function(t){if(!this.active_field&&this.container.hasClass("chosen-container-active"))return this.close_field()},n.prototype.close_field=function(){return t(this.container[0].ownerDocument).off("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale(),this.search_field.blur()},n.prototype.activate_field=function(){if(!this.is_disabled)return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},n.prototype.test_active_click=function(e){var s;return(s=t(e.target).closest(".chosen-container")).length&&this.container[0]===s[0]?this.active_field=!0:this.close_field()},n.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=i.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},n.prototype.result_do_highlight=function(t){var e,s,i,n,r;if(t.length){if(this.result_clear_highlight(),this.result_highlight=t,this.result_highlight.addClass("highlighted"),i=parseInt(this.search_results.css("maxHeight"),10),r=this.search_results.scrollTop(),n=i+r,s=this.result_highlight.position().top+this.search_results.scrollTop(),(e=s+this.result_highlight.outerHeight())>=n)return this.search_results.scrollTop(e-i>0?e-i:0);if(s<r)return this.search_results.scrollTop(s)}},n.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},n.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.get_search_field_value()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},n.prototype.update_results_content=function(t){return this.search_results.html(t)},n.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},n.prototype.set_tab_index=function(t){var e;if(this.form_field.tabIndex)return e=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=e},n.prototype.set_label_behavior=function(){if(this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=t("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0)return this.form_field_label.on("click.chosen",this.label_click_handler)},n.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},n.prototype.search_results_mouseup=function(e){var s;if((s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first()).length)return this.result_highlight=s,this.result_select(e),this.search_field.focus()},n.prototype.search_results_mouseover=function(e){var s;if(s=t(e.target).hasClass("active-result")?t(e.target):t(e.target).parents(".active-result").first())return this.result_do_highlight(s)},n.prototype.search_results_mouseout=function(e){if(t(e.target).hasClass("active-result")||t(e.target).parents(".active-result").first())return this.result_clear_highlight()},n.prototype.choice_build=function(e){var s,i;return s=t("<li />",{"class":"search-choice"}).html("<span>"+this.choice_label(e)+"</span>"),e.disabled?s.addClass("search-choice-disabled"):((i=t("<a />",{"class":"search-choice-close","data-option-array-index":e.array_index})).on("click.chosen",function(t){return function(e){return t.choice_destroy_link_click(e)}}(this)),s.append(i)),this.search_container.before(s)},n.prototype.choice_destroy_link_click=function(e){if(e.preventDefault(),e.stopPropagation(),!this.is_disabled)return this.choice_destroy(t(e.target))},n.prototype.choice_destroy=function(t){if(this.result_deselect(t[0].getAttribute("data-option-array-index")))return this.active_field?this.search_field.focus():this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.get_search_field_value().length<1&&this.results_hide(),t.parents("li").first().remove(),this.search_field_scale()},n.prototype.results_reset=function(){if(this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.trigger_form_field_change(),this.active_field)return this.results_hide()},n.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},n.prototype.result_select=function(t){var e,s;if(this.result_highlight)return e=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?e.removeClass("active-result"):this.reset_single_select_options(),e.addClass("result-selected"),s=this.results_data[e[0].getAttribute("data-option-array-index")],s.selected=!0,this.form_field.options[s.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(s):this.single_set_selected_text(this.choice_label(s)),this.is_multiple&&(!this.hide_results_on_select||t.metaKey||t.ctrlKey)?t.metaKey||t.ctrlKey?this.winnow_results({skip_highlight:!0}):(this.search_field.val(""),this.winnow_results()):(this.results_hide(),this.show_search_field_default()),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.trigger_form_field_change({selected:this.form_field.options[s.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,t.preventDefault(),this.search_field_scale())},n.prototype.single_set_selected_text=function(t){return null==t&&(t=this.default_text),t===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").html(t)},n.prototype.result_deselect=function(t){var e;return e=this.results_data[t],!this.form_field.options[e.options_index].disabled&&(e.selected=!1,this.form_field.options[e.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.trigger_form_field_change({deselected:this.form_field.options[e.options_index].value}),this.search_field_scale(),!0)},n.prototype.single_deselect_control_build=function(){if(this.allow_single_deselect)return this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")},n.prototype.get_search_field_value=function(){return this.search_field.val()},n.prototype.get_search_text=function(){return t.trim(this.get_search_field_value())},n.prototype.escape_html=function(e){return t("<div/>").text(e).html()},n.prototype.winnow_results_set_highlight=function(){var t,e;if(e=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),null!=(t=e.length?e.first():this.search_results.find(".active-result").first()))return this.result_do_highlight(t)},n.prototype.no_results=function(t){var e;return e=this.get_no_results_html(t),this.search_results.append(e),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},n.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},n.prototype.keydown_arrow=function(){var t;return this.results_showing&&this.result_highlight?(t=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(t):void 0:this.results_show()},n.prototype.keyup_arrow=function(){var t;return this.results_showing||this.is_multiple?this.result_highlight?(t=this.result_highlight.prevAll("li.active-result")).length?this.result_do_highlight(t.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight()):void 0:this.results_show()},n.prototype.keydown_backstroke=function(){var t;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(t=this.search_container.siblings("li.search-choice").last()).length&&!t.hasClass("search-choice-disabled")?(this.pending_backstroke=t,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0},n.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},n.prototype.search_field_scale=function(){var e,s,i,n,r,o,h;if(this.is_multiple){for(r={position:"absolute",left:"-1000px",top:"-1000px",display:"none",whiteSpace:"pre"},s=0,i=(o=["fontSize","fontStyle","fontWeight","fontFamily","lineHeight","textTransform","letterSpacing"]).length;s<i;s++)r[n=o[s]]=this.search_field.css(n);return(e=t("<div />").css(r)).text(this.get_search_field_value()),t("body").append(e),h=e.width()+25,e.remove(),this.container.is(":visible")&&(h=Math.min(this.container.outerWidth()-10,h)),this.search_field.width(h)}},n.prototype.trigger_form_field_change=function(t){return this.form_field_jq.trigger("input",t),this.form_field_jq.trigger("change",t)},n}()}).call(this);
;/*})'"*/
;/*})'"*/
/**
 * jQuery jPages v0.7
 * Client side pagination with jQuery
 * http://luis-almeida.github.com/jPages
 *
 * Licensed under the MIT license.
 * Copyright 2012 Luís Almeida
 * https://github.com/luis-almeida
 */

 ;(function($,window,document,undefined){var name="jPages",instance=null,defaults={containerID:"",first:false,previous:"← previous",next:"next →",last:false,links:"numeric",startPage:1,perPage:10,midRange:5,startRange:1,endRange:1,keyBrowse:false,scrollBrowse:false,pause:0,clickStop:false,delay:50,direction:"forward",animation:"",fallback:400,minHeight:true,callback:undefined};function Plugin(element,options){this.options=$.extend({},defaults,options);this._container=$("#"+this.options.containerID);if(!this._container.length)return;this.jQwindow=$(window);this.jQdocument=$(document);this._holder=$(element);this._nav={};this._first=$(this.options.first);this._previous=$(this.options.previous);this._next=$(this.options.next);this._last=$(this.options.last);this._items=this._container.children(":visible");this._itemsShowing=$([]);this._itemsHiding=$([]);this._numPages=Math.ceil(this._items.length/this.options.perPage);this._currentPageNum=this.options.startPage;this._clicked=false;this._cssAnimSupport=this.getCSSAnimationSupport();this.init();}Plugin.prototype={constructor:Plugin,getCSSAnimationSupport:function(){var animation=false,animationstring='animation',keyframeprefix='',domPrefixes='Webkit Moz O ms Khtml'.split(' '),pfx='',elm=this._container.get(0);if(elm.style.animationName)animation=true;if(animation===false){for(var i=0;i<domPrefixes.length;i++){if(elm.style[domPrefixes[i]+'AnimationName']!==undefined){pfx=domPrefixes[i];animationstring=pfx+'Animation';keyframeprefix='-'+pfx.toLowerCase()+'-';animation=true;break;}}}return animation;},init:function(){this.setStyles();this.setNav();this.paginate(this._currentPageNum);this.setMinHeight();},setStyles:function(){var requiredStyles="<style>"+".jp-invisible { visibility: hidden !important; } "+".jp-hidden { display: none !important; }"+"</style>";$(requiredStyles).appendTo("head");if(this._cssAnimSupport&&this.options.animation.length)this._items.addClass("animated jp-hidden");else this._items.hide();},setNav:function(){var navhtml=this.writeNav();this._holder.each(this.bind(function(index,element){var holder=$(element);holder.html(navhtml);this.cacheNavElements(holder,index);this.bindNavHandlers(index);this.disableNavSelection(element);},this));if(this.options.keyBrowse)this.bindNavKeyBrowse();if(this.options.scrollBrowse)this.bindNavScrollBrowse();},writeNav:function(){var i=1,navhtml;navhtml=this.writeBtn("first")+this.writeBtn("previous");for(;i<=this._numPages;i++){if(i===1&&this.options.startRange===0)navhtml+="<span>...</span>";if(i>this.options.startRange&&i<=this._numPages-this.options.endRange)navhtml+="<a href='#' class='jp-hidden'>";else
navhtml+="<a>";switch(this.options.links){case"numeric":navhtml+=i;break;case"blank":break;case"title":var title=this._items.eq(i-1).attr("data-title");navhtml+=title!==undefined?title:"";break;}navhtml+="</a>";if(i===this.options.startRange||i===this._numPages-this.options.endRange)navhtml+="<span>...</span>";}navhtml+=this.writeBtn("next")+this.writeBtn("last")+"</div>";return navhtml;},writeBtn:function(which){return this.options[which]!==false&&!$(this["_"+which]).length?"<a class='jp-"+which+"'>"+this.options[which]+"</a>":"";},cacheNavElements:function(holder,index){this._nav[index]={};this._nav[index].holder=holder;this._nav[index].first=this._first.length?this._first:this._nav[index].holder.find("a.jp-first");this._nav[index].previous=this._previous.length?this._previous:this._nav[index].holder.find("a.jp-previous");this._nav[index].next=this._next.length?this._next:this._nav[index].holder.find("a.jp-next");this._nav[index].last=this._last.length?this._last:this._nav[index].holder.find("a.jp-last");this._nav[index].fstBreak=this._nav[index].holder.find("span:first");this._nav[index].lstBreak=this._nav[index].holder.find("span:last");this._nav[index].pages=this._nav[index].holder.find("a").not(".jp-first, .jp-previous, .jp-next, .jp-last");this._nav[index].permPages=this._nav[index].pages.slice(0,this.options.startRange).add(this._nav[index].pages.slice(this._numPages-this.options.endRange,this._numPages));this._nav[index].pagesShowing=$([]);this._nav[index].currentPage=$([]);},bindNavHandlers:function(index){var nav=this._nav[index];nav.holder.bind("click.jPages",this.bind(function(evt){var newPage=this.getNewPage(nav,$(evt.target));if(this.validNewPage(newPage)){this._clicked=true;this.paginate(newPage);}evt.preventDefault();},this));if(this._first.length){this._first.bind("click.jPages",this.bind(function(){if(this.validNewPage(1)){this._clicked=true;this.paginate(1);}},this));}if(this._previous.length){this._previous.bind("click.jPages",this.bind(function(){var newPage=this._currentPageNum-1;if(this.validNewPage(newPage)){this._clicked=true;this.paginate(newPage);}},this));}if(this._next.length){this._next.bind("click.jPages",this.bind(function(){var newPage=this._currentPageNum+1;if(this.validNewPage(newPage)){this._clicked=true;this.paginate(newPage);}},this));}if(this._last.length){this._last.bind("click.jPages",this.bind(function(){if(this.validNewPage(this._numPages)){this._clicked=true;this.paginate(this._numPages);}},this));}},disableNavSelection:function(element){if(typeof element.onselectstart!="undefined")element.onselectstart=function(){return false;};else if(typeof element.style.MozUserSelect!="undefined")element.style.MozUserSelect="none";else
element.onmousedown=function(){return false;};},bindNavKeyBrowse:function(){this.jQdocument.bind("keydown.jPages",this.bind(function(evt){var target=evt.target.nodeName.toLowerCase();if(this.elemScrolledIntoView()&&target!=="input"&&target!="textarea"){var newPage=this._currentPageNum;if(evt.which==37)newPage=this._currentPageNum-1;if(evt.which==39)newPage=this._currentPageNum+1;if(this.validNewPage(newPage)){this._clicked=true;this.paginate(newPage);}}},this));},elemScrolledIntoView:function(){var docViewTop,docViewBottom,elemTop,elemBottom;docViewTop=this.jQwindow.scrollTop();docViewBottom=docViewTop+this.jQwindow.height();elemTop=this._container.offset().top;elemBottom=elemTop+this._container.height();return((elemBottom>=docViewTop)&&(elemTop<=docViewBottom));},bindNavScrollBrowse:function(){this._container.bind("mousewheel.jPages DOMMouseScroll.jPages",this.bind(function(evt){var newPage=(evt.originalEvent.wheelDelta||-evt.originalEvent.detail)>0?(this._currentPageNum-1):(this._currentPageNum+1);if(this.validNewPage(newPage)){this._clicked=true;this.paginate(newPage);}evt.preventDefault();return false;},this));},getNewPage:function(nav,target){if(target.is(nav.currentPage))return this._currentPageNum;if(target.is(nav.pages))return nav.pages.index(target)+1;if(target.is(nav.first))return 1;if(target.is(nav.last))return this._numPages;if(target.is(nav.previous))return nav.pages.index(nav.currentPage);if(target.is(nav.next))return nav.pages.index(nav.currentPage)+2;},validNewPage:function(newPage){return newPage!==this._currentPageNum&&newPage>0&&newPage<=this._numPages;},paginate:function(page){var itemRange,pageInterval;itemRange=this.updateItems(page);pageInterval=this.updatePages(page);this._currentPageNum=page;if($.isFunction(this.options.callback))this.callback(page,itemRange,pageInterval);this.updatePause();},updateItems:function(page){var range=this.getItemRange(page);this._itemsHiding=this._itemsShowing;this._itemsShowing=this._items.slice(range.start,range.end);if(this._cssAnimSupport&&this.options.animation.length)this.cssAnimations(page);else this.jQAnimations(page);return range;},getItemRange:function(page){var range={};range.start=(page-1)*this.options.perPage;range.end=range.start+this.options.perPage;if(range.end>this._items.length)range.end=this._items.length;return range;},cssAnimations:function(page){clearInterval(this._delay);this._itemsHiding.removeClass(this.options.animation+" jp-invisible").addClass("jp-hidden");this._itemsShowing.removeClass("jp-hidden").addClass("jp-invisible");this._itemsOriented=this.getDirectedItems(page);this._index=0;this._delay=setInterval(this.bind(function(){if(this._index===this._itemsOriented.length)clearInterval(this._delay);else{this._itemsOriented.eq(this._index).removeClass("jp-invisible").addClass(this.options.animation);}this._index=this._index+1;},this),this.options.delay);},jQAnimations:function(page){clearInterval(this._delay);this._itemsHiding.addClass("jp-hidden");this._itemsShowing.fadeTo(0,0).removeClass("jp-hidden");this._itemsOriented=this.getDirectedItems(page);this._index=0;this._delay=setInterval(this.bind(function(){if(this._index===this._itemsOriented.length)clearInterval(this._delay);else{this._itemsOriented.eq(this._index).fadeTo(this.options.fallback,1);}this._index=this._index+1;},this),this.options.delay);},getDirectedItems:function(page){var itemsToShow;switch(this.options.direction){case"backwards":itemsToShow=$(this._itemsShowing.get().reverse());break;case"random":itemsToShow=$(this._itemsShowing.get().sort(function(){return(Math.round(Math.random())-0.5);}));break;case"auto":itemsToShow=page>=this._currentPageNum?this._itemsShowing:$(this._itemsShowing.get().reverse());break;default:itemsToShow=this._itemsShowing;}return itemsToShow;},updatePages:function(page){var interval,index,nav;interval=this.getInterval(page);for(index in this._nav){if(this._nav.hasOwnProperty(index)){nav=this._nav[index];this.updateBtns(nav,page);this.updateCurrentPage(nav,page);this.updatePagesShowing(nav,interval);this.updateBreaks(nav,interval);}}return interval;},getInterval:function(page){var neHalf,upperLimit,start,end;neHalf=Math.ceil(this.options.midRange/2);upperLimit=this._numPages-this.options.midRange;start=page>neHalf?Math.max(Math.min(page-neHalf,upperLimit),0):0;end=page>neHalf?Math.min(page+neHalf-(this.options.midRange%2>0?1:0),this._numPages):Math.min(this.options.midRange,this._numPages);return{start:start,end:end};},updateBtns:function(nav,page){if(page===1){nav.first.addClass("jp-disabled");nav.previous.addClass("jp-disabled");}if(page===this._numPages){nav.next.addClass("jp-disabled");nav.last.addClass("jp-disabled");}if(this._currentPageNum===1&&page>1){nav.first.removeClass("jp-disabled");nav.previous.removeClass("jp-disabled");}if(this._currentPageNum===this._numPages&&page<this._numPages){nav.next.removeClass("jp-disabled");nav.last.removeClass("jp-disabled");}},updateCurrentPage:function(nav,page){nav.currentPage.removeClass("jp-current");nav.currentPage=nav.pages.eq(page-1).addClass("jp-current");},updatePagesShowing:function(nav,interval){var newRange=nav.pages.slice(interval.start,interval.end).not(nav.permPages);nav.pagesShowing.not(newRange).addClass("jp-hidden");newRange.not(nav.pagesShowing).removeClass("jp-hidden");nav.pagesShowing=newRange;},updateBreaks:function(nav,interval){if(interval.start>this.options.startRange||(this.options.startRange===0&&interval.start>0))nav.fstBreak.removeClass("jp-hidden");else nav.fstBreak.addClass("jp-hidden");if(interval.end<this._numPages-this.options.endRange)nav.lstBreak.removeClass("jp-hidden");else nav.lstBreak.addClass("jp-hidden");},callback:function(page,itemRange,pageInterval){var pages={current:page,interval:pageInterval,count:this._numPages},items={showing:this._itemsShowing,oncoming:this._items.slice(itemRange.start+this.options.perPage,itemRange.end+this.options.perPage),range:itemRange,count:this._items.length};pages.interval.start=pages.interval.start+1;items.range.start=items.range.start+1;this.options.callback(pages,items);},updatePause:function(){if(this.options.pause&&this._numPages>1){clearTimeout(this._pause);if(this.options.clickStop&&this._clicked)return;else{this._pause=setTimeout(this.bind(function(){this.paginate(this._currentPageNum!==this._numPages?this._currentPageNum+1:1);},this),this.options.pause);}}},setMinHeight:function(){if(this.options.minHeight&&!this._container.is("table, tbody")){setTimeout(this.bind(function(){this._container.css({"min-height":this._container.css("height")});},this),1000);}},bind:function(fn,me){return function(){return fn.apply(me,arguments);};},destroy:function(){this.jQdocument.unbind("keydown.jPages");this._container.unbind("mousewheel.jPages DOMMouseScroll.jPages");if(this.options.minHeight)this._container.css("min-height","");if(this._cssAnimSupport&&this.options.animation.length)this._items.removeClass("animated jp-hidden jp-invisible "+this.options.animation);else this._items.removeClass("jp-hidden").fadeTo(0,1);this._holder.unbind("click.jPages").empty();}};$.fn[name]=function(arg){var type=$.type(arg);if(type==="object"){if(this.length&&!$.data(this,name)){instance=new Plugin(this,arg);this.each(function(){$.data(this,name,instance);});}return this;}if(type==="string"&&arg==="destroy"){instance.destroy();this.each(function(){$.removeData(this,name);});return this;}if(type==='number'&&arg%1===0){if(instance.validNewPage(arg))instance.paginate(arg);return this;}return this;};})(jQuery,window,document);

;/*})'"*/
;/*})'"*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return!!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0)})};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()))},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0)}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o])}var n},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[])},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1)}else 1===c.length&&c[0].targetElement===t?(o(),c=[]):c=c.filter(function(e){return e.targetElement!==t})}});

;/*})'"*/
;/*})'"*/
(function ($) {

    // Production steps of ECMA-262, Edition 5, 15.4.4.17
    // Reference: http://es5.github.io/#x15.4.4.17
    if (!Array.prototype.some) {
        Array.prototype.some = function(fun, thisArg) {
            'use strict';

            if (this == null) {
                throw new TypeError('Array.prototype.some called on null or undefined');
            }

            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(thisArg, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    $.fn.pieTimer = function () {
        $(this).each(function () {
            var timerLines = $(this).find('.timer-line'),
                speed = $(this).data('speed'),
                numEl = $(this).find('.timer-num'),
                maxNum = numEl.text(),
                maxAngle = 360 * maxNum / 60,
                currentAngle = 0,
                π = Math.PI,
                block = $('#node-102 #block-bean-shapify-booth-3d-full-body-scann'),
                scrollOffset = block.offset().top - $(window).height() + 200;
            //console.log(scrollOffset);
            function draw() {
                //		console.log(1);
                currentAngle++;
                if (currentAngle <= maxAngle) {
                    numEl.text(Math.round(currentAngle / 6));
                    var r = ( currentAngle * π / 180 )
                        , x = Math.sin(r) * 170
                        , y = Math.cos(r) * -170
                        , mid = ( currentAngle > 180 ) ? 1 : 0
                        , anim = 'M 0 0 v -170 A 170 170 1 '
                            + mid + ' 1 '
                            + x + ' '
                            + y + ' z';
                    timerLines.attr('d', anim);
                    setTimeout(draw, speed); // Redraw
                }
            }

            $(window).scroll(function () { //TODO: придумать как запускать ф-цию drow() один раз вместо бесконечного цикла
                if ($(window).scrollTop() > scrollOffset) {
                    draw();
                }
            });
        });
    }

    $.fn.isInViewportBottom = function(topIndent) {
        if (this.length > 0) {
            topIndent = topIndent || 0;
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();

            return elementBottom > (viewportTop + topIndent);
        }

        return false;
    };

    //$(document).on('click', '.search-row__btn', function(){
    //    var searchRow = $(this).parent('.search-n-lang__search-block');
    //    var searchInput = searchRow.find('.search-row__input');
    //    if (searchRow.is('.active') && searchInput.val().length) {
    //        $(this).parent('form').submit();
    //    }
    //});


    $(window).load(function () {
        if (location.hash && $('div:not(.tab-pane)').is(location.hash)) {
            var dy = 70;
            if ($('#secondary-menu').size() > 0) {
                dy = 86;
            }
            $('html, body').stop().animate({
                scrollTop: $(location.hash).offset().top - dy
            }, 1);
        }
    });

    $(document).ready(function () {
        var JSAPP = window.JSAPP || {};

        var body = $('body');

        //Set language name
        JSAPP.setLanguageName = function () {
            var language;
            var languageButton;

            language = $('.langs-menu a.active').first().attr('xml:lang');
            if (language == 'zh-hans') language = 'cn';
            languageButton = $('.lan').first();
            $(languageButton).text(language);
        };

        //searchRow
        JSAPP.searchRow = function () {
            var searchRow = $('.search-n-lang__search-block'),
            search = $('.search-row__btn-search'),
            close = $('.search-row__btn-close'),
            searchWrap = $('.search-n-lang'),
            searchInput = $('.search-row__input'),
            form = $('.search-row__form');

            //console.log ('search', search);

            search.each(function(i, e){

                $(e).on('click', function (ev) {
                    ev.preventDefault();
                    searchWrap.addClass('col-xs-8 col-sm-8 col-md-10 _open');
                    searchRow.addClass('active');

                    //console.log('this', $(this));

                    var searchInput = $(this).parent('form').find('.search-row__input');


                    $(this).parent('form').find(searchInput).focus();


                    if (searchRow.is('.active') && searchInput.val().length) {
                        //console.log('$(this)', $(this));
                        $(this).parent('form').submit();
                    }
                });

            });


            close.on('click', function () {
                searchWrap.removeClass('col-xs-8 col-sm-8 col-md-10 _open');
                searchRow.removeClass('active');
                searchInput.blur();
            });

            $('.search-n-lang .local').on('click', function () {
                    $(this).toggleClass("open");
            });

        };

        //searchPage
        JSAPP.searchPage = function () {
            var searchBlock = $('.search-page-filter .views-exposed-widgets'),
              input = searchBlock.find('input.form-text'),
              close = $('<span class="close-button">');

              searchBlock.append(close);

            close.on('click', function(){
                //console.log('clicked');
                input.val('');
            })
        };

        //Main menu
        JSAPP.mainMenu = function () {
            var header;
            var smallHeader;

            header = $('.header');
            var headerHeight = $(header).outerHeight();
            smallHeader = $('.header').clone();
            smallHeader.appendTo('body').addClass('small');

            $(window).scroll(function () {
                var scrollOffset = window.pageYOffset;
                var compareTableHeader = $('#specifications').find('.tab-header-wrap:first-of-type');
                var compareTableHeaderImage = compareTableHeader.find('tr:first-of-type');
                if (scrollOffset > headerHeight) {
                    $('body').addClass('top-menu-opened');
                    // compareTableHeaderImage.addClass('hide-image');
                    var menu = '';
                    if ($('.header:not(.small) #block-menu-menu-main-menu-new').length) {
                      menu = $('.header:not(.small) #block-menu-menu-main-menu-new>.content>.menu');
                    } else {
                      menu = $('.header:not(.small) #block-system-main-menu>.content>.menu');
                    }

                    menu.children().removeClass('hover');

                    //header.stop().animate({top: -90+"px"}, 500);
                    //smallHeader.stop().animate({top: 0 + "px", opacity: 1}, 200);
                    //secondMenu.el.stop().animate({top: 50 + 'px'}, 200);
                }
                else {
                    $('body').removeClass('top-menu-opened');
                    // compareTableHeaderImage.removeClass('hide-image');
                    //smallHeader.stop().animate({top: -50 + "px", opacity: 0}, 200);
                    //header.stop().animate({top: 0+"px"}, 900);
                    //secondMenu.el.stop().animate({top: 0}, 200);
                }
            });
        };

        //main Menu Remove Some Active Links
        JSAPP.mainMenuRemoveSomeActiveLinks = function () {
            var mainMenu = $('.region-header .block-menu ul.menu'),
                mobMenu = $('.mob-menu-container ul.menu'),
                path = window.location.pathname,
                pathArr = path.split('/'),
                ind;

            for(var i = 0; i<pathArr.length; i++){
                    if(pathArr[i] == "3d-models"){
                    ind = i;
                }
            }

            function is3dModel(item) {
                return item == "3d-models";
            }

            if(pathArr.some(is3dModel) && ind < pathArr.length-1){
                mainMenu.find('li.expanded a.active-trail.active').removeClass('active').addClass('normal-link').off('click');
                mobMenu.find('li.expanded a.active-trail.active').removeClass('active').addClass('normal-link').off('click');
            }
        };

        //Spoller links
        JSAPP.spollerLink = function () {
            var links;
            links = $('.spoller-link');
            links.each(function () {
                $(this).bind('click', function () {
                    $(this).attr('href', "javascript:;").next().toggleClass("spoller-body-expanded").slideToggle();
                });
            });
        };

        //App spoller links
        JSAPP.appSpollerLink = function () {
            var link_text_show = Drupal.t('View more materials');
            var link_text_hide = Drupal.t('Hide');

            $('div:not(.models-wr) > .app-spoller').parent().append('<div class="app-spoller-link">' + link_text_show + '</div>');
            $('.models-wr > .app-spoller').parent().after('<div class="app-spoller-link__models">' + link_text_show + '</div>');

            $('.app-spoller-link').each(function () {
                $(this).bind('click', function () {
                    $(this).prev().slideToggle('fast');
                    if ($(this).text() == link_text_show) {
                        $(this).text(link_text_hide);
                    } else {
                        $(this).text(link_text_show);
                    }
                    return false;
                });
            });
            $('.app-spoller-link__models').each(function () {
                $(this).bind('click', function () {
                    $(this).prev().find('.app-spoller').slideToggle('fast');
                    if ($(this).text() == link_text_show) {
                        $(this).text(link_text_hide);
                    } else {
                        $(this).text(link_text_show);
                    }
                    return false;
                });
            });

        };

        //Scroll to element anchors
        JSAPP.scrollAnchorToElement = function () {
            $('a[href^=#]').not('.not-anchor').bind("click", function (e) {
                var anchor = $(this);

                JSAPP.scrollToElement($(anchor.attr('href')), 800);
                /*$('html, body').stop().animate({
                 scrollTop: $(anchor.attr('href')).offset().top - 70
                 }, 1000);*/

                e.preventDefault();
            });
            //return false;
        }

        //Scroll to element
        JSAPP.scrollToElement = function (el, speed) {
            if (speed == 'undefined') {
                speed = 1;
            }
            var dy = 70;
            if (secondMenu.el.size() > 0) {
                dy = 86;
            }
            //console.log(dy);
            $('html, body').stop().animate({
                scrollTop: el.offset().top - dy
            }, speed);
        }

        //Scrollable links
        JSAPP.scrollableLinks = function () {
            var headings;
            var linksContainer;
            var mainContainer;

            headings = $('.group-views-row .group-title');
            linksContainer = document.createElement("div");
            mainContainer = $('.vocabulary-knowledge-base .content');

            headings.each(function () {
                //copy heading attr
                href = "#" + $(this).attr('id');
                text = $(this).text();
                //create anchor, setting its attributes and append to container
                $('<a/>', {
                    href: href,
                    text: text
                }).appendTo(linksContainer);
            });

            $(linksContainer).addClass('scrollable-links').appendTo(mainContainer);

        };

        //Scrollable block
        JSAPP.scrollableBlock = function () {
            //$('#scrollable-block img').on('load', function () {
            var block = {};
            block.el = $('#scrollable-block');
            block.el.height('auto');

            block.w = $('.col-md-6:first').width();
            block.el.width(block.w);
            block.h = block.el.height();
            //block.w = block.el.width();

            var container = $('#prod-top-container');
            //var cTopY = container.offset().top;
            //block.stopH = container.height();
            var ww = $(window).width();
            //var dh = block.h / 2 + 120;
            //var bottomPadding = dh;

            if (ww > 992) {
                //block.el.css({width: block.w + 'px', height: block.h + 'px'});
                block.el.css({"width": block.w + 'px'});
                block.el.removeClass('block-fixed-bottom').addClass('block-fixed');

                var scrollTop;
                var bottomPadding = 40;

                $(window).scroll(function () {
                    scrollTop = $(window).scrollTop();

                    block.stopH = container.outerHeight();
                    block.h = block.el.height();
                    block.Xposition = block.stopH - block.h - bottomPadding;

                    if ((scrollTop > block.Xposition)) {
                        block.el.css({"top": block.Xposition + 'px'});
                        block.el.addClass('block-fixed-bottom');
                        /* $('.scroll-bg-hw').css({
                         'background-attachment': 'initial',
                         'background-position-y': block.stopH-553+'px'
                         });*/
                    } else {
                        block.el.removeClass('block-fixed-bottom');
                        block.el.css({"top": 'auto'});
                        /*$('.scroll-bg-hw').css({
                         'background-attachment': 'fixed',
                         'background-position-y': '100px'
                         });*/
                    }
                });
                $(window).scroll();
            }
            //});
        };


        //Mobile menu
        JSAPP.mobileMenu = function () {
          var mobMenuHeader,
            mobMenuContainer,
            mobMenuToggle,
            mobMenu,
            mobSocial,
            mobLanguages,
            mobSubMenuToggle,
            mobLanguageButton,
            mobControlsWrapper,
            mobMenuFooter,
            mobMenuIsOpened;

          mobMenuHeader = $('.header .row');
          mobMenuContainer = $('<div/>', {
            'class': "mob-menu-container"
          });
          mobMenuToggle = $('<a href="#" class="mob-menu-toggle"><span></span><span></span><span></span></a>');
          if ($('#block-menu-menu-main-menu-new').length) {
            mobMenu = $('#block-menu-menu-main-menu-new>.content>.menu').first().clone();
            mobMenuContainer.addClass("mob-menu-container--new");
          } else {
            mobMenu = $('#block-system-main-menu>.content>.menu').first().clone();
          }
          mobSocial = $('.header .social').first().clone();
          mobLanguages = $('.header .local').first().clone();
          mobSubMenuToggle = $('.mob-menu-container li.expanded>a');
          mobControlsWrapper = $('<div/>', {
            'class': "mob-controls-wr"
          });
          mobMenuFooter = $('<div/>', {
            'class': "mob-menu-footer"
          });

          var subMenuContainer = $('<div class="subMenuContainer"><button class="close"></button></div>');

          subMenuContainer.prependTo(mobMenuContainer);
          mobMenuToggle.appendTo(mobMenuHeader);
          mobMenuContainer.addClass("hidden-md hidden-lg").appendTo('body');
          mobMenu.appendTo(mobMenuContainer);
          mobMenuFooter.appendTo(mobMenuContainer);
          mobControlsWrapper.appendTo(mobMenuFooter);
          mobSocial.appendTo(mobControlsWrapper);
          mobLanguages.removeClass('hidden-xs hidden-sm').appendTo(mobControlsWrapper);
          mobLanguageButton = $('.mobmenu-container .local');
          $('<div class="searchToggle"></div>').prependTo(mobControlsWrapper);

          var targetElement = document.querySelector(".mob-menu-container > .menu");

          $('.mob-menu-toggle').on('click', function (e) {
            mobMenuIsOpened = false;
            $(this).toggleClass("open");
            $('body').toggleClass("mob-menu-opened");
            $(mobMenuContainer).slideToggle(100);
            mobMenuContainer.toggleClass("opened");

            if ($('.mob-menu-container').hasClass('opened')) {
              bodyScrollLock.disableBodyScroll(targetElement);
            } else {
              bodyScrollLock.enableBodyScroll(targetElement);
            }

            e.preventDefault();
            return false;
          });

          function checkIfMenuIsOpened(menu) {
            var links = menu.children('li.expanded'),
              isOpened = false;
            links.each(function () {
              if($(this).hasClass('open')){
                isOpened = true;
                return false;
              }
            });
            return isOpened;
          }

          $('.mob-menu-container li.expanded>a').on('click', function (e) {
            var isOpened = $(this).parent().hasClass('open'),
                backLink = $('<button class="backLink"></button>'),
                _parent = $(this).parent();

            _parent.addClass("open");

            if(!(isOpened)){
              if(_parent.find('.backLink').length === 0){
                _parent.prepend(backLink);
              }
              $(this).siblings('.menu').slideToggle(100);
              _parent.siblings('.open').find('.backLink').click();
              e.preventDefault();
            } else {
              return true;
            }
            mobMenuIsOpened = checkIfMenuIsOpened($(this).parents('.menu'));
            if(mobMenuIsOpened){
              $(this).parents('.menu').addClass("opened");
            } else {
              $(this).parents('.menu').removeClass("opened");
            }
            return false;
          });

          $('.mob-menu-container li.expanded').on('click touch', '.backLink', function (e) {
            var _parent = $(this).parent();
            _parent.removeClass("open");
            $(this).siblings('.menu').slideUp(100);
            $(this).siblings('.menu').find('.backLink').click();
            mobMenuIsOpened = checkIfMenuIsOpened($(this).parents('.menu'));
            if(mobMenuIsOpened){
              $(this).parents('.menu').addClass("opened");
            } else {
              $(this).parents('.menu').removeClass("opened");
            }
          });

          setTimeout(function () {
            $('.mob-menu-container--new li.expanded:not(.menu-last-item)>a.active-trail:not(.active)').click();
          }, 500);
          
          $('.subMenuContainer .close').on('click', function () {
            mobMenuContainer.removeClass('subMenuLangsIsOpened subMenuSearchIsOpened');
            $('.mob-menu-container .subMenuContainer .search-n-lang').prependTo('.mob-menu-container .mob-controls-wr');
            $('.mob-menu-container .subMenuContainer .langs-list').appendTo('.mob-menu-container .mob-controls-wr > .local');
          });


          $('.mob-menu-container .mob-controls-wr > .local').on('click', function () {
            mobMenuContainer.toggleClass("subMenuLangsIsOpened");
            mobMenuContainer.removeClass("subMenuSearchIsOpened");
            $('.mob-menu-container .subMenuContainer .search-n-lang').prependTo('.mob-menu-container .mob-controls-wr');

            if(mobMenuContainer.hasClass('subMenuLangsIsOpened')){
              $(this).find('.langs-list').appendTo(subMenuContainer);
            } else {
              $('.mob-menu-container .subMenuContainer .langs-list').appendTo('.mob-menu-container .mob-controls-wr > .local');
            }
          });


          $('.mob-menu-container .mob-controls-wr .searchToggle').on('click', function () {
            mobMenuContainer.toggleClass("subMenuSearchIsOpened");
            mobMenuContainer.removeClass("subMenuLangsIsOpened");
            $('.mob-menu-container .subMenuContainer .langs-list').appendTo('.mob-menu-container .mob-controls-wr > .local');

            if(mobMenuContainer.hasClass('subMenuSearchIsOpened')){
              $(this).siblings('.search-n-lang').appendTo(subMenuContainer);
              $('.subMenuContainer .search-row__input').focus();
            } else {
              $('.mob-menu-container .subMenuContainer .search-n-lang').prependTo('.mob-menu-container .mob-controls-wr');
            }
          });

        };

        JSAPP.dropdownMenu = function () {
          var menu = '';
          if ($('#block-menu-menu-main-menu-new').length) {
            menu = $('#block-menu-menu-main-menu-new>.content>.menu');
          } else {
            menu = $('#block-system-main-menu>.content>.menu');
          }

          var timerIn;
          var timerOut;

          menu.children().on('mouseenter', function (e) {

            clearTimeout(timerIn);
            clearTimeout(timerOut);
            var $el = $(this);
            timerIn = setTimeout(function () {
              menu.children().not(this).removeClass('hover');
              $el.addClass('hover').siblings().removeClass('hover');
            }, 100);
          }).on('mouseleave', function (e) {

            clearTimeout(timerIn);
            clearTimeout(timerOut);
            var $this = $(this);
            timerOut = setTimeout(function() {
              $this.removeClass("hover");
            }, 100);
          });
        };

        JSAPP.prodTabs = function () {
            if ($('#second-menu-list.nav-tabs').size() > 0) {

                function wrapClass() {
                    var hash = location.hash.substring(1);
                    $('#secondary-menu').removeClass().addClass('active-tab-' + hash);
                }

                // add a hash to the URL when the user clicks on a tab
                $('#second-menu-list a[data-toggle="tab"]').on('click', function (e) {
                    history.pushState(null, null, $(this).attr('href'));
                });
                // navigate to a tab when the history changes
                var popstateHandler = function (e) {
                  var activeTab = $('[href=' + location.hash + ']');
                  if (activeTab.length) {
                    activeTab.tab('show');
                  } else {
                    $('#second-menu-list a[data-toggle="tab"]:first').tab('show');
                  }
                  wrapClass();
                };
                if (window.addEventListener) {
                  window.addEventListener("popstate", popstateHandler);
                }
                else if (window.attachEvent) {
                  window.attachEvent("onpopstate", popstateHandler);
                }

                if ($.inArray(location.hash, ["#overview", "#specifications", "#equipment", "#upcoming", "#past", "#swview", "#whats-new", "#sensors", "#compare-studios", "#dezign-works"]) != -1) {
                    $('a[href="' + location.hash + '"]').addClass('active').tab('show');
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, 1);
                }
                else if ($('*').is('a[href="#past"]') && location.search.indexOf('page') != -1) {
                    $('a[href="#past"]').addClass('active').tab('show');
                }
                else {
                    $('#second-menu-list a[data-toggle="tab"]:first').addClass('active').tab('show');
                    if (location.hash == '#spider') {
                        JSAPP.scrollToElement($('#spider-second-full-block'), 800);
                    }
                }
                wrapClass();

                $('#second-menu-list a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    $('#second-menu-list a[data-toggle="tab"]').removeClass('active');
                    $(this).addClass('active');
                    wrapClass();

                    if (location.hash == '#overview') {
                        //setTimeout(JSAPP.scrollableBlock, 100);
                        //@TODO: пофиксить пересчёт центрального скролл блока
                        //location.reload();
                    }

                    setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, 1);
                });


            }
        }


        //secondary menu stike
        var secondMenu = {};
        secondMenu.el = $('#secondary-menu');
        if (secondMenu.el.size() > 0) {
            secondMenu.height = secondMenu.el.height();
            secondMenu.nextWrap = $(secondMenu.el.next());
            secondMenu.top = secondMenu.el.offset().top;
        }
        JSAPP.secondMenuStik = function () {
              var _ifSWPage = ($('body').hasClass('node-type-product-sw') || $('body').hasClass('node-type-product-hw')) ? true : false,
                compareTableBlock = $('#specifications .bean-compare-table, #compare-studios .bean-compare-table'),
                compareTableBlockWrap = $(compareTableBlock).find('.container-now'),
                _xScroll = 0,
                compareTableBlockOffsetTop = (compareTableBlock.length) ? compareTableBlock.offset().top : 0;

              if(_ifSWPage && compareTableBlock.length){
                compareTableBlockWrap.on('scroll', function(e){
                  var compareTableHeader = compareTableBlock.find('.tab-header-wrap:first-of-type');
                  _xScroll = -(e.target.scrollLeft);
                  if (compareTableBlock.hasClass('compareTableHeader-fixed')) {
                    $(compareTableHeader).css({
                      left: _xScroll
                    });
                  }
                });
              }

              function setTableHeaderSticky() {
                var ww = $(window).width(),
                   secondaryMenu = $('#secondary-menu'),
                  ifMobile = (ww > 990) ? false : true;

                var compareTableBlock = $('#specifications .bean-compare-table, #compare-studios .bean-compare-table'),
                  compareTableBlockWrap = $(compareTableBlock).find('.container-now'),
                  compareTableBlockOffsetTop = (compareTableBlock.length) ? compareTableBlock.offset().top : 0;
                var compareTableHeader = compareTableBlock.find('.tab-header-wrap:first-of-type');
                var compareTableHeaderHeight = compareTableHeader.outerHeight();
                var secondaryMenuHeight = (ifMobile) ? 0 : secondaryMenu.height();
                var headerSmallHeight = $('.header.small').outerHeight();
                var compareTableHeaderImage = compareTableHeader.find('tr:first-of-type');

                var compareTableLastBody = $('.tab-content-wrap').last();

                var commonHeight = headerSmallHeight + secondaryMenuHeight + compareTableHeaderHeight;


                if(_ifSWPage && compareTableBlock.length){
                  var lastBodyInViewport = compareTableLastBody.isInViewportBottom(commonHeight);

                  if ($(window).scrollTop() >= (compareTableBlockOffsetTop -  secondaryMenuHeight )
                      && lastBodyInViewport) {
                    compareTableBlock.addClass('compareTableHeader-fixed');
                    compareTableHeaderImage.addClass('hide-image');

                    var compareTableHeaderTopPosition = headerSmallHeight + secondaryMenuHeight;
                    var comparePaddingTop = compareTableHeaderTopPosition + headerSmallHeight;
                    if($(body).hasClass('logged-in')){
                      comparePaddingTop = compareTableHeaderTopPosition + headerSmallHeight + 110;
                    }

                    compareTableBlock.css({
                      'padding-top': comparePaddingTop
                    });
                    compareTableHeader.css({
                      'position': 'fixed',
                      'left': _xScroll,
                      'width': '100%',
                      'min-width': '700px',
                      'z-index': '1',
                      // 'transition': 'top .5s',
                      'top': compareTableHeaderTopPosition
                    });

                    if(compareTableHeader.hasClass('tab-col3') || compareTableHeader.hasClass('tab-col4')){
                      compareTableHeader.find('table td:first-child').css({'opacity': '0'})
                    }


                  } else {
                    compareTableBlock.removeClass('compareTableHeader-fixed');
                    compareTableBlock.css({'padding-top': '0'});
                    compareTableHeader.css({
                      'position': 'relative',
                      'left': 0,
                      // 'transition': 'none',
                      'top': 'auto'
                    });

                    if(compareTableHeader.hasClass('tab-col3') || compareTableHeader.hasClass('tab-col4')){
                      compareTableHeader.find('table td:first-child').css({'opacity': '1'})
                    }
                  }
                }
              }

              $('#second-menu-list a').on('click', function () {
                var compareTableBlock = $('#specifications .bean-compare-table, #compare-studios .bean-compare-table');
                if(compareTableBlock.length){
                  compareTableBlock.find('.tab-header-wrap:first-of-type').css({'position': 'relative', 'top': 'auto'});
                  // console.log('compareTableBlock');
                  // setTimeout(function () {
                  //   setTableHeaderSticky();
                  // },0);
                }

              });

              // .tab-pane#compare-studios
              $(window).scroll(function () {
                var ww = $(window).width();
                setTableHeaderSticky();
                if (ww > 990) {
                    if ($(window).scrollTop() > secondMenu.top) {
                        body.addClass('sm-stage1');
                    } else {
                        body.removeClass('sm-stage1');
                    }
                }
            });
        }


        //Table cell wrapper
        JSAPP.tableCellWr = function () {
            //$('.field-name-field-compare-tables td.tab-caption').parent().addClass('tr-caption');
            // $('.field-name-field-compare-tables tr:not(".tr-caption") td').wrapInner("<div class='td-border'></div>");
            /*$('.field-name-field-compare-tables tr').each(function() {
             var maxHeight = 0,
             tr = $(this);
             tr.find('.td-border').each(function() {
             var tdBorder = $(this);
             if(tdBorder.height() > maxHeight) {
             maxHeight = tdBorder.height();
             }
             });
             tr.find('.td-border').each(function() {
             $(this).height(maxHeight);
             });
             });*/
            $('#block-bean-eva-vs-spider-compare-table .field-name-field-compare-tables tr, #block-bean-compire-table-spider-vs-eva .field-name-field-compare-tables tr, #block-bean-ray-specifications .field-name-field-compare-tables tr').each(function () {
                var tr = $(this),
                    count = tr.find('td').length;
                if (count == 2) {
                    tr.find('td:first').css({"width": '40%'});
                    tr.find('td:last').css({"width": '60%'});
                }
            });
        }


        //Slider front
        JSAPP.sliderFrontOld = function () {

            var wrap = $('.cel-slider-wrap');
            var slides = wrap.find('.slide-item');
            slides.hide();
            var curent = 0;
            var count = slides.size();
            //slideShow(curent);

            var bgImg = new Image();
            var bgurl = $('.slider-bg').css('background-image');
            bgImg.src = bgurl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            //console.log(bgImg.src);
            var bgLoaded = false;

            var Img = $("<img />");
            $(Img).attr("src", bgImg.src + "?" + new Date().getTime());

            $(Img).on('load', function () {
                bgLoaded = true;
                //console.log('bg loaded');
            });


            $('.slide-image-img:first img').on('load', function () {
                var el = $(this).parent().parent().parent().parent().parent();
                shc(el);
            });

            function shc(el) {
                //console.log(bgLoaded);
                if (bgLoaded) {
                    $('.slide-image-img').removeClass('hidden');
                    slideShow(curent);
                } else {
                    setTimeout(function () {
                        shc(el);
                    }, 300);
                }
            }

            $('body').on('click', '.cs-pagination a', function () {
                slideShow($(this).data('index'));
                return false;
            });

            /*$('.animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
             $(this).addClass('animated-off');
             console.log('anm');
             });*/

            function slideShow(index) {
                slides.fadeOut(400);

                $(slides[index]).find('.animated').hide(1, function () {
                    $(slides[index]).fadeIn(400).find('.animated').show();
                });


                curent = index;
            }

            function slideTimer() {
                if (curent + 1 >= count) {
                    curent = 0;
                } else {
                    curent++;
                }
                slideShow(curent);
                setTimeout(slideTimer, 7000);
            }

            setTimeout(slideTimer, 7000);
        }

        JSAPP.centerSliderBg = function () {
            var ww = $('body:first').width();
            var centerX = ww / 2;
            var dx = 1;
            if (ww % 2 == 0) {
                dx = 1;
            }
            $('.slider-bg').css({'background-position': -(1920 / 2 - centerX) - dx + 'px 0'});
        }

        JSAPP.sliderFront = function () {
            var wrap = $('.cel-slider-wrap, .normal-slider-wrap, .wt-slider-front-wrap');
            wrap.each(function () {
                wrap = $(this);
                console.log('wrap 1,', wrap);
                var slides = wrap.find('.slide-item');
                slides.hide();
                var current = 0;
                var count = slides.size();
                var slideDelay = 7000;
                var pagerItem = wrap.find('.cs-pagination a');

                $('.slide-image-img').removeClass('hidden');

                // $('body').on('click', pagerItem, function () {
                //     slideShow($(this).data('index'));
                //     return false;
                // });
                pagerItem.on('click', function () {
                    slideShow($(this).data('index'));
                    return false;
                });

                function slideShow(index) {
                    slides.not(index).fadeOut(400);

                    $(slides[index]).find('.animated').hide(1, function () {

                        $(slides[index]).fadeIn(400).find('.animated').show();
                        pagerItem.removeClass("active");
                        // pagerItem(':eq(' + index + ')').addClass("active");

                        pagerItem.each(function () {
                            if ($(this).data('index') == index){
                                $(this).addClass("active")
                            }
                        })
                    });

                    current = index;
                }

                function slideTimer() {
                    if (current + 1 >= count) {
                        current = 0;
                    } else {
                        current++;
                    }

                    slideShow(current);
                }

                var timer_id = setInterval(slideTimer, slideDelay);
                slideShow(current);

                $(wrap).on('mouseenter', function () {
                    clearInterval(timer_id);
                }).on('mouseleave', function () {
                    timer_id = setInterval(slideTimer, slideDelay);
                });
            });

        };

        JSAPP.stripedLines = function (element, color) {
            $(element).css("background-color", "transparent");
            $(element + ':odd').css("background-color", color);
        }

        JSAPP.selectReseller = function () {
            var selectVal;
            var select = $('.select-country');
            var first = true;
            $(select).on('change', function () {
                $('#resellers-table .country-row').show();
                $('#resellers-table .node-reseller').show();
                selectVal = $(this).val();
                if (selectVal == 'all') {
                    $('#resellers-table .country-row').show();
                    JSAPP.stripedLines('.country-row', "#f7f7f7");

                } else {
                    $('#resellers-table .country-row').hide();
                    $('#resellers-table .country-row-' + selectVal).show();
                    JSAPP.stripedLines('.country-row-' + selectVal, "#f7f7f7");
                }
                if (first) {
                    first = false;
                } else {
                    JSAPP.scrollToElement($('#resellers-table'));
                }


            });
            $(select).change();

            $('#resellers-table .country-row').each(function () {
                if ($(this).find('.status-gold').size() > 0) {
                    $(this).addClass('row-with-gold');
                }
                if ($(this).find('.status-silver').size() > 0) {
                    $(this).addClass('row-with-silver');
                }
                if ($(this).find('.status-geomagic').size() > 0) {
                    $(this).addClass('row-with-geomagic');
                }
            });

            $('.status-anchors a').on('click', function () {
                var status = 'silver';
                if ($(this).hasClass('gold')) status = 'gold'
                    else if ($(this).hasClass('geomagic')) status = 'geomagic'
                    else if ($(this).hasClass('res-all')) status = 'all';

                $('.status-anchors .active').removeClass('active');
                $(this).addClass('active');

                var countryClass = '';
                if (selectVal != 'all') countryClass = '.country-row-' + selectVal;

                if (status != 'all') {
                    $('#resellers-table .node-reseller').hide();
                    $('#resellers-table .country-row').hide();
                    $('#resellers-table .node-reseller.status-' + status).show();
                    $('#resellers-table .country-row.row-with-' + status + countryClass).show();
                    JSAPP.stripedLines('#resellers-table .country-row.row-with-' + status + countryClass, "#f7f7f7");
                } else {
                    $('#resellers-table .node-reseller').show();
                    $('#resellers-table .country-row' + countryClass).show();
                    JSAPP.stripedLines('.country-row', "#f7f7f7");
                }

                return false;
            });

            JSAPP.stripedLines('.country-row', "#f7f7f7");
        }

        JSAPP.selectPartner = function () {
            var selectVal;
            var select = $('.select-partners');
            $(select).on('change', function () {
                $('#partners-table .partner-row').show();
                $('#partners-table .node-reseller').show();
                selectVal = $(this).val();
                if (selectVal == 'all') {
                    $('#partners-table .partner-row').show();
                    JSAPP.stripedLines('.partner-row', "#f7f7f7");

                } else {
                    $('#partners-table .partner-row').hide();
                    $('#partners-table .partner-row-' + selectVal).show();
                    JSAPP.stripedLines('.partner-row-' + selectVal, "#f7f7f7");
                }

            });
            $(select).change();


            JSAPP.stripedLines('.partner-row', "#f7f7f7");
        }


        JSAPP.spollerAdressResellers = function () {
            // var ps = $('.node-reseller').find('.field-name-body p:last, .field-name-body p:eq(-2)');
            //addClass('hidden')
            // ps.wrapAll('<div><div class="spoller" /></div>').addClass('hidden');


            $('.node-reseller .field-name-body').each(function () {
                $(this).find('p:last, p:eq(-2)').wrapAll('<div><div class="spoller" /></div>');
                $(this).find('a[href^="http"]').addClass('reseller-link');
            });


            var link_text_show = Drupal.t('show more');
            var link_text_hide = Drupal.t('hide');

            $('.spoller').addClass('hidden').parent().append('<a class="res-show-info">' + link_text_show + '</a>');

            $('.res-show-info').on('click', function () {
                //$(this).parent().find('p').toggleClass('hidden');
                $(this).parent().find('.spoller').toggleClass('hidden');
                $(this).toggleClass('active');
                if ($(this).text() == link_text_show) {
                    $(this).text(link_text_hide);
                } else {
                    $(this).text(link_text_show);
                }
                return false;
            });

        }

        JSAPP.compareTableHints = function () {
            var _toggler = $('.ct-hint-toggler'),
                _hint = $('.ct-hint'),
                windowWidth = window.innerWidth,
                _active = false;

            function checkActiveClass(_item, _class) {
                var _active = _item.hasClass(_class);
                return _active;
            }

            function checkCompareTablesHints() {
                _toggler.each(function () {
                    if (windowWidth <= 991){
                        $(this).on('click touch', function () {
                            console.log('this', $(this));
                            var _target = $(this).data('title'),
                                _currentToggler = $(this);

                                _active = checkActiveClass(_currentToggler, 'active');

                            _toggler.removeClass('active');

                            if (_active) {
                                _currentToggler.removeClass('active');
                                _active = false;
                            } else {
                                _currentToggler.addClass('active');
                                _active = true;
                            }

                            _hint.each(function () {
                                if($(this).hasClass(_target)){
                                    $(this).appendTo(_currentToggler);
                                }
                            })
                        });
                        $('body').click(function(event) {
                            event.stopPropagation();
                            if($(event.target).hasClass('ct-hint-toggler')){
                                return;
                            }
                            _toggler.removeClass('active');
                        });
                    } else {
                        $(this).hover(function () {
                            var _target = $(this).data('title'),
                                _currentToggler = $(this),
                                _active = checkActiveClass(_currentToggler, 'active');

                            _toggler.removeClass('active');

                            if (_active) {
                                _currentToggler.removeClass('active');
                                _active = false;
                            } else {
                                _currentToggler.addClass('active');
                                _active = true;
                            }
                            _hint.each(function () {
                                if($(this).hasClass(_target)){
                                    $(this).appendTo(_currentToggler);
                                }
                            })
                        });
                    }
                })
            }

            checkCompareTablesHints();
        }

        JSAPP.filtersToggle = function () {
          var filtersWrapper = $('.d3-models-page .filters'),
            filterBlocks = filtersWrapper.find('.filter-block:not(.toggle-visibility)'),
            filterToggler = filtersWrapper.find('.toggle-visibility');

          filterToggler.on('click touch', function () {
            $(this).toggleClass('open');
            filterBlocks.fadeToggle();
          })
        }

        JSAPP.videoFakeClick = function () {
            var fakeLink = $('#block-bean-sdk-sdk-application-examples .field-link');

            fakeLink.on("click", function () {
                $(this).prev().find('a').click();
            });
        }

        JSAPP.filterScaner3Dmodels = function () {
          var locationPath = window.location.pathname;
          var $filters = $('.d3-wrap .filters');
          var $clear_filter = $('.d3-wrap .filters button.clear_filters');
          var $subtitle = $('.d3-content .d3-subtitle');
          var $models1 = $('.d3-content .models-page .model');
          var modelsList1 = $('.d3-model-section-list .list-content');
          var modelsVisible1 = $models1.clone();

          modelsList1.html(modelsVisible1);

          if(modelsVisible1.length > 12){
            $(".d3-model-section-list .list-pagination").jPages({
              containerID : "list3dContent",
              perPage     : 12,
              first       : ".list-pagination-customBtns span.arrowFirst",
              last        : ".list-pagination-customBtns span.arrowLast",
              previous    : false,
              next        : false,
              startRange  : 0,
              endRange    : 0,
              callback    : function( pages, items ){
                var h = $('.header').height();
                var b = $('#secondary-menu').height();
                var destination = $('.d3-content').offset().top - h;
                if ($(window).width() > 991) {
                  destination -= b;
                }
                $('html, body').animate({ scrollTop: destination });
              }
            });
            $('.list-pagination-customBtns').show();
          } else if (!modelsVisible1.length){
            modelsList1.html('<div class="col-xs-12" style="font-size: 24px">' + Drupal.t('No results found') + '<br />' + Drupal.t('Please try another category') + '</div>');
          }


          $filters.find('input[name="scanning_with"], ' +
            'input[name="applications"], ' +
            'input[name="format"]').on('click change', function(e)
          {
            var scanningWith = $filters.find('input[name="scanning_with"]:checked').val();
            var application = $filters.find('input[name="applications"]:checked').val();
            var format = $filters.find('input[name="format"]:checked').val();
            var $models = $('.d3-content .models-page .model');
            var modelsList = $('.d3-model-section-list .list-content');

            if (scanningWith) {
              var subtitleText;
              if (scanningWith === 'all') {
                subtitleText = Drupal.t('Scanned using Artec 3D technology');
              }
              else {
                var scannerName = $filters
                  .find('label[for="edit-scanning-with-' + scanningWith + '"] .filter-option-title')
                  .text();
                subtitleText = Drupal.t('Scanned using @scanner', {
                  '@scanner': scannerName,
                });
              }
              $subtitle.text(subtitleText);
            }

            if (scanningWith && scanningWith !== 'all') {
              var scanningWithSelector = $filters.find('input[name="scanning_with"]:checked')
                .data('scaner');
              $models = $models.filter(scanningWithSelector);
            }

            if (application && application !== 'all') {
              $models = $models.filter('.model-application-' + application);
            }

            if (format && format !== 'all') {
              $models = $models.filter('.model-format-' + format);
            }

            var modelsVisible = $models.clone();

            if(modelsVisible.length){
              modelsList.html(modelsVisible);
            } else {
              modelsList.html('<div class="col-xs-12" style="font-size: 24px">' + Drupal.t('No results found') + '<br />' + Drupal.t('Please try another category') + '</div>');
            }

            if(modelsVisible.length > 12){
              $(".d3-model-section-list .list-pagination").jPages({
                containerID : "list3dContent",
                perPage     : 12,
                first       : ".list-pagination-customBtns span.arrowFirst",
                last        : ".list-pagination-customBtns span.arrowLast",
                previous    : false,
                next        : false,
                startRange  : 0,
                endRange    : 0,
                callback    : function( pages, items ){
                  var h = $('.header').innerHeight();
                  var b = $('#secondary-menu').height();
                  var destination = $('.d3-content').offset().top - h;
                  if ($(window).width() > 991) {
                    destination -= b;
                  }
                  $('html, body').animate({ scrollTop: destination });
                }
              });
              $('.list-pagination-customBtns').show();
            } else {
              $('.list-pagination-customBtns').hide();
            }

            var filters = [
              scanningWith,
              application,
              format,
            ].filter(function (item) {
              return item && item !== 'all';
            }).join('+');

            if (filters) {
              location = '#' + filters;
            }
            else {
              location.hash = '';
            }

            $.cookie('models_3d_filters', filters, {path: '/'});
          });

          if(!location.hash.length && $filters.length){
            $filters.find('input[value="all"]').attr('checked', 'checked');
          }

          var restoreFilters = function(filters) {
            var filters = filters.split('+');
            for (var i = 0; i < filters.length; i++) {
              $filters.find('input[value="' + filters[i] + '"]').click();
            }
          };

          if (location.hash !== '') {
            restoreFilters(location.hash.slice(1));
          }
          else if ($.cookie('models_3d_filters')) {
            restoreFilters($.cookie('models_3d_filters'));
          }

          $clear_filter.on('click', function () {
            location.hash = '';

            $.cookie('models_3d_filters', null, {path: '/'});

            restoreFilters('all');
            console.log('document.cookie', document.cookie);
            if(Drupal.settings.pathPrefix.length){
              window.location = '/' + Drupal.settings.pathPrefix + '3d-models/';
            } else {
              window.location = '/3d-models/';
            }
          })
        }

        JSAPP.scrollSecondaryActive = function () {
            if ($('.page-3d-models, .node-type-aplications').size() > 0) {

                if (location.hash !== '') {
                    $('a[href="' + location.hash + '-content"]').addClass('active');
                }

                $('.scroll-secondary a').not('.not-anchor').on('click', function () {
                    $('.scroll-secondary a').removeClass('active');
                    $(this).addClass('active');
                });

            }

        }

        JSAPP.shopPageToggleAnchors = function () {
          var togglers = $('.store-page--anchors a');
          if(togglers.length){
            togglers.each(function () {
              $(this).on('click touch', function () {
                togglers.removeClass('activeToggler');
                $(this).addClass('activeToggler')
              })
            })
          }
        }

        JSAPP.storEvaUp = function () {
            //console.log('up');
            $('body.page-node-69 #node-100').append('<div id="eva-upgrade-icon"><div class="up-text">' + Drupal.t('Upgrade') + '</div></div>');
        }

        JSAPP.aqPop = function () {
            $('#ask-question-btn').on('click', function () {
                $('#ask-question-pop').fadeIn();
                return false;
            });
            $('.close-pop').on('click', function () {
                $('#ask-question-pop').fadeOut();
                return false;
            });

            var $ww = $(window).width();
            //console.log($ww);
            if ($ww < 1550) {
                var lastTop = $(window).scrollTop();
                var wh = $(window).outerHeight();
                //var fTop = $('.footer:first').offset().top - wh + 200;
                //console.log(fTop);
                $(window).on('scroll', function () {
                    var curTop = $(window).scrollTop();
                    var btn = $('#ask-question-btn');
                    var btn_proc = false;
                    var fTop = $('.footer:first').offset().top - wh;
                    if (curTop >= fTop) {
                        btn_proc = true;
                    }
                    if (curTop > lastTop) {
                        //console.log(curTop);

                        if (btn_proc) {
                            btn.stop().animate({bottom: -60}, function () {
                                btn_proc = false;
                            });
                            btn_proc = true;
                        }
                    } else {
                        if (!btn_proc) {
                            btn.stop().animate({bottom: 0}, function () {
                                btn_proc = false;
                            });
                            btn_proc = true;
                        }
                    }
                    lastTop = curTop;
                    //console.log(lastTop);
                });
            }
        }

        JSAPP.tagsSpoller = function () {
            var tags_wrap = $('#block-tagclouds-1');
            tags_wrap.append('<a href="" id="tags-sp-btn">' + Drupal.t('View all') + '</a>');
            tags_wrap.find('.content').css({'max-height': 100});
            $('#tags-sp-btn').on('click', function () {
                tags_wrap.find('.content').css({'max-height': 2000});
                $(this).remove();
                return false;
            });
        }

        JSAPP.scrollBg = function () {

            var scroll_elemens = $('.block-scroll-bg');
            scroll_elemens.parent().addClass('block-scroll-bg-wrap')
            if (scroll_elemens.size() > 0) {
                var eImgBgSize = 1280 + 200,
                    w = $(window),
                    wHeight = w.height() + 120;

                scroll_elemens.each(function () {
                    var e = $(this);
                    $(window).on('scroll', function () {
                        var eOffsetTop = e.offset().top;
                        var wScrollTop = w.scrollTop() + wHeight;

                        if (eOffsetTop < wScrollTop && wScrollTop < eOffsetTop + wHeight + eImgBgSize) {
                            var $bgpY = 800 * (wScrollTop - eOffsetTop) / (wHeight + eImgBgSize);
                            //console.log($bgpY);
                            e.css({'background-position': 'center ' + (-$bgpY) + 'px'});
                        }
                    });
                });

            }

        }

        //center image in full news
        JSAPP.newsImgCenter = function () {
            if ($('body.node-type-news, body.node-type-cases').size() > 0) {
                $('.node-news-full .field-name-body img').parent().addClass('p-with-img-center');
            }
        }

        JSAPP.linkExt = function () {
            $(".node-news-full a[href^=http], #resellers a[href^=http], #page-reseller-container a[href^=http], .d3-model-full-view a[href^=http]").each(function() {
                if(this.href.indexOf(location.hostname) == -1) {
                    $(this).attr("target","_blank");
                    $(this).attr("rel", "noopener");
                    if(this.href.match(/youtube.com|disqus.com|artecgroup.zendesk.com|shapify.me|viewshape.com|artec-group.com|artecid.com|iphone3dscanner.com|my.artec3d.com|exactmetrology.com/i) == null) {
                        $(this).attr("rel", "nofollow noopener");
                    }
                }
            })

            $('#node-164.node-reseller.node-teaser .field-name-body .reseller-link').removeAttr("rel");
        }

        JSAPP.linkGTM = function () {
            $("#page-reseller-container a[href^=http]").each(function() {
                if(this.href.indexOf(location.hostname) == -1) {
                    $(this).addClass("where-to-buy");
                }
            })
        }

        JSAPP.fixFooter = function () {
            var docHeight = $(window).height();
            if ($('.footer').length) {
              var footerHeight = $('.footer').outerHeight(true);
              var footerTop = $('.footer').position().top + footerHeight;
              if (footerTop < docHeight && $('.thx-page').size() == 0) {
                  $('.footer').css('margin-top', (docHeight - footerTop) + 'px');
              }
            }
        }

        JSAPP.download3dModel = function () {
            $('.d3-model-file').click(function () {
                window.location = $(this).data('file');
                return false;
            });
        }

        JSAPP.downloadAStrial = function () {
            $('.as-trial-download').click(function () {
                window.location = 'https://my.artec3d.com/api/aic/artec_studio_trial_installer';
                return false;
            });
        }

        JSAPP.i_linkClick = function () {
            $('.i_link').click(function () {
                window.location = $(this).find("a").attr("href");
                return false;
            });
        }

        JSAPP.changeAdminMenuUrl = function () {
            var menuLink = $('.page-taxonomy-term #admin-menu-menu .admin-menu-tab a, .page-taxonomy-term .tabs ul.tabs.primary li a');
            // console.log('menuLink', menuLink.length);
            if(menuLink.length){
                menuLink.each(function () {
                    var _href = $(this).attr('href');
                    _href = _href.replace(/%3F/g,"?");
                    _href = _href.replace(/%3D/g,"=");
                    $(this).attr('href', _href);
                })
            }
        }

        // move scanner img on mobile
        JSAPP.moveMobileScannerImg = function () {
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

            var scannerAddedText = $('.scanner-description .scannersAddedText'),
              evaImage = $('.scanner-description .eva-description + .col-sm-12 img.img-responsive'),
              descriptionFirstContent = $('.scanner-description .eva-description .field-name-field-first-content'),
              descriptionFirstContentText = $('.scanner-description .eva-description .field-name-field-first-content .field-item p:not([class])'),
              downloadBrochure = $('.scanner-description .eva-description .download-brochure'),
              scannerPriceWrap = $('.scanner-description .eva-description .scanner-price-wrap'),
              scannerBlockItems = $('.scanner-description .scanner-block-items'),
              rayImage = $('.page-node-1259 .scanner-description #scrollable-block img'),
              rayAway = $('.scanner-description .artec-ray-away');

            function init() {
                var mobileScreen = 991,
                    windowWidth = document.documentElement.clientWidth,
                    image = $('.scanner-description .eva-description + .col-sm-12 img.img-responsive'),
                    _image = $('.scanner-description .eva-description + .col-sm-12 #scrollable-block'),
                    _image_ray = $('.scanner-description .eva-description + .col-sm-12 #scrollable-block'),
                    isTextMedium = $('.scanner-description .eva-description .field p.text-medium'),
                    isEvaPage = $('body').hasClass('page-node-64'),
                    // scannerAddedText = $('.scanner-description .scannersAddedText'),
                    // descriptionFirstContent = $('.scanner-description .eva-description .field-name-field-first-content'),
                    // descriptionFirstContentText = $('.scanner-description .eva-description .field-name-field-first-content .field-item p:not([class])'),
                    // downloadBrochure = $('.scanner-description .eva-description .download-brochure'),
                    // scannerPriceWrap = $('.scanner-description .eva-description .scanner-price-wrap'),
                    // scannerBlockItems = $('.scanner-description .scanner-block-items'),
                    isRoboticPage = $('body').hasClass('page-node-1073'),
                    isSpiderPage = $('body').hasClass('page-node-42'),
                    isRayPage = $('body').hasClass('page-node-1259');

                if (windowWidth <= mobileScreen && isRoboticPage && isTextMedium.length > 0) {
                    image.insertAfter('.scanner-description .eva-description .field p.text-medium');
                    // console.log('isRoboticPage', isRoboticPage);
                } else if (windowWidth <= mobileScreen && isEvaPage) {
                    descriptionFirstContent.html(descriptionFirstContent.find('p.text-medium, ul.sun-style-list'));
                    evaImage.appendTo(descriptionFirstContent);
                    scannerAddedText.appendTo(descriptionFirstContent);
                    downloadBrochure.appendTo(descriptionFirstContent);
                    scannerPriceWrap.appendTo(descriptionFirstContent);
                    scannerBlockItems.appendTo(descriptionFirstContent);
                    descriptionFirstContentText.appendTo(descriptionFirstContent);
                } else if (windowWidth <= mobileScreen && isRayPage){
                  descriptionFirstContent.html(descriptionFirstContent.find('p.text-medium, ul.sun-style-list'));
                  rayImage.appendTo(descriptionFirstContent);
                  rayAway.appendTo(descriptionFirstContent);
                  downloadBrochure.appendTo(descriptionFirstContent);
                  scannerPriceWrap.appendTo(descriptionFirstContent);
                  scannerBlockItems.appendTo(descriptionFirstContent);
                  descriptionFirstContentText.appendTo(descriptionFirstContent);


                } else if (windowWidth <= mobileScreen && isSpiderPage) {
                    _image.insertAfter('.scanner-description .eva-description .field ul.sun-style-list');
                    // console.log('isEvaPage', isEvaPage);
                } else if (windowWidth <= mobileScreen && isTextMedium.length > 0) {
                    _image.insertAfter('.scanner-description .eva-description .field p.text-medium');
                    // console.log(windowWidth);
                } else if (windowWidth <= mobileScreen && isTextMedium.length == 0) {
                    _image_ray.addClass('artec-ray');
                    _image_ray.insertAfter('.scanner-description .eva-description .artec-ray-orange');
                    // console.log(isTextMedium.length);
                } else {
                 $('.scanner-description .eva-description .field p.text-medium + img').prependTo('.scanner-description .eva-description + .col-sm-12 #scrollable-block');
                }
            }

            init();
            $(window).resize(function () {
                    init();
                }
            );

            // if(iOS){
            //     init();
            // } else {
            //     $(window).resize(function () {
            //             init();
            //         }
            //     );
            // }
        }


        //shop page toggle anchors
        JSAPP.shopPageToggleAnchors();

        // move scanner img on mobile
        JSAPP.moveMobileScannerImg();

        // change admin menu tabs URL on taxonomy pages
        JSAPP.changeAdminMenuUrl();

        //toggle compare table hints
        JSAPP.compareTableHints();

        // show-hide scanner filters
        JSAPP.filtersToggle();
        //Set language name
        JSAPP.setLanguageName();
        //Main menu
        JSAPP.mainMenu();
        // init Search
        JSAPP.searchRow();
        // init searchPage
        JSAPP.searchPage();
        //Spoller links
        JSAPP.spollerLink();
        // JSAPP.appSpollerLink();
        //Scrollable links
        JSAPP.scrollableLinks();
        //Scroll to element
        JSAPP.scrollAnchorToElement();
        //Scrollable block
        //setTimeout(JSAPP.scrollableBlock, 500);
        //Mobile menu
        JSAPP.mobileMenu();
        //product tabs
        JSAPP.prodTabs();
        //secondary-menu stick
        JSAPP.secondMenuStik();
        //Equal height columns
        //JSAPP.storeEqualHeightColumns();
        //Table call wrapper
        JSAPP.tableCellWr();
        //Select Reseller
        JSAPP.selectReseller();
        JSAPP.selectPartner();
        //Pie timer
        $('.timer-start').pieTimer();

        JSAPP.spollerAdressResellers();

        //3d model file download
        JSAPP.download3dModel();
        JSAPP.filterScaner3Dmodels();
        JSAPP.scrollSecondaryActive();

        //Store Eva upgrade block
        JSAPP.storEvaUp();
        //Fake click
        JSAPP.videoFakeClick();
        // mainMenuRemoveSomeActiveLinks
        JSAPP.mainMenuRemoveSomeActiveLinks();

        //JSAPP.sliderFront();
        JSAPP.sliderFront();

        JSAPP.linkExt();

        JSAPP.linkGTM();

        JSAPP.fixFooter();

        JSAPP.downloadAStrial();

        //front
        if (body.hasClass('front')) {
            JSAPP.centerSliderBg();

            $(window).resize(function () {
                JSAPP.centerSliderBg();
            })
        }
        $(window).scroll(function () {

        });

        //Ask question popup
        JSAPP.aqPop();

        JSAPP.tagsSpoller();

        //Vacancy add form button
        //JSAPP.vacancyFormAddButton();

        //Scroll background image
        //setTimeout(function () {JSAPP.scrollBg();}, 3000);
        JSAPP.scrollBg();

        JSAPP.newsImgCenter();
        JSAPP.i_linkClick();

        JSAPP.dropdownMenu();
    });

    $(document).ajaxSuccess(function () {
        $('select.chosen-select').each(function () {
            var $this = $(this);
            var $component = $this.closest('.webform-component');

            if(($this.val() == 'select_or_other')){
                var otherVal = $component.find('input.chosen-select').val();
                $component.find('.chosen-container .chosen-single span').text(otherVal);
            }
        })
    });
})(jQuery);


(function ($) {
    'use strict';
    Drupal.behaviors.artecTheme = {
        attach: function (context, settings) {
            //DOWNLOAD SCANAPP
            $('.scanapp-trial').on('click', function () {
                if ($.cookie('scan_app') == undefined) {
                    var $code = Date.now();
                    $code = $code +'-'+ $code;
                    $.cookie('scan_app', $code.substr(0,20), {
                        domain: '.artec3d.com',
                        path: '/',
                        expires: 30
                    });
                }
                return true;
            });
            //geomagic control-x trial
            $('#webform-ajax-wrapper-1359 a.button-red').on('click', function () {
                if ($.cookie('geomagic_control_x_trial') == undefined) {
                    var $code = Date.now();
                    $code = $code +'-'+ $code;
                    $.cookie('geomagic_control_x_trial', $code.substr(0,20), {
                        domain: '.artec3d.com',
                        path: '/',
                        expires: 30
                    });
                }
                return true;
            });
            //geomagic design-x trial
            $('#webform-ajax-wrapper-1361 a.button-red').on('click', function () {
                if ($.cookie('geomagic_design_x_trial') == undefined) {
                    var $code = Date.now();
                    $code = $code +'-'+ $code;
                    $.cookie('geomagic_design_x_trial', $code.substr(0,20), {
                        domain: '.artec3d.com',
                        path: '/',
                        expires: 30
                    });
                }
                return true;
            });
            //geomagic wrap
            $('#webform-ajax-wrapper-1360 a.button-red').on('click', function () {
                if ($.cookie('geomagic_wrap_trial') == undefined) {
                    var $code = Date.now();
                    $code = $code +'-'+ $code;
                    $.cookie('geomagic_wrap_trial', $code.substr(0,20), {
                        domain: '.artec3d.com',
                        path: '/',
                        expires: 30
                    });
                }
                return true;
            });

            //var link_text = Drupal.t('View more contacts info');
            $('.webform-component-file .form-managed-file .form-file', context).parent().append('<a href="#" class="upload-btn">Choose file</a>');

            $('.webform-component-file .form-managed-file input.form-file', context).on('change', function () {
                $(this).parent().find('.form-submit').mousedown();
            });
            $('span.file', context).parent().addClass('file-uploaded');

            //goals
            $('#edit-webform-ajax-submit-435', context).click(function () {
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function () {
                            (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                    a = s.createElement(o),
                        m = s.getElementsByTagName(o)[0];
                    a.async = 1;
                    a.src = g;
                    m.parentNode.insertBefore(a, m)
                })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

                ga('create', 'UA-2026756-4', 'auto');
                ga('send', 'event', 'Lead', 'Submission', 'where-to-buy-contact-us', 1);
            });


            //chosen select
            function chosenSelectInit() {
                var chosenSelect = $('select.chosen-select');
                chosenSelect.chosen();

                chosenSelect.on('chosen:showing_dropdown', function(e, params) {
                    var $this = $(this);
                    var $component = $this.closest('.webform-component');
                    $component.find('.chosen-results li').each(function () {
                        var thisLi = $(this);
                        if (thisLi.text() === 'select_or_other'){
                            thisLi.hide();
                        }
                    })
                });

                chosenSelect.on('change', function () {
                    var $this = $(this);
                    var $component = $this.closest('.webform-component');

                    if($this.val() == 'select_or_other'){
                        var otherVal = $component.find('input.chosen-select').val();
                        $component.find('.chosen-container .chosen-single span').text(otherVal);
                    }

                    if(($this.val())){
                        $component.find('.chosen-container .chosen-single').addClass('active');
                    } else {
                        $component.find('.chosen-container .chosen-single').removeClass('active');
                    }
                })
            }
            chosenSelectInit();

            // breadcrumbs & tabs slider
             function breadcrumbsTabsSlider () {
                 var checkWindowWidth = function () {
                    var windowWidth = window.innerWidth,
                        secondaryMenuBreadcrumbs = $('#secondary-menu .secondary-menu__side.sm-title'),
                        secondaryMenuTabs = $('#secondary-menu .secondary-menu__side.pull-right');

                    if (windowWidth <= 991){
                        secondaryMenuTabs.after(secondaryMenuBreadcrumbs);
                    } else {
                        secondaryMenuBreadcrumbs.after(secondaryMenuTabs);
                    }


                    if ($('#second-menu-list.nav-tabs > a').size() > 0){
                            var secondaryMenuTabsBlock = $('#second-menu-list'),
                                secondaryMenuTabsWidth = $('#second-menu-list').width(),
                                secondaryMenuLinks = $('#second-menu-list > a'),
                                secondaryMenuTabsInnerWidth = 0;

                        for(var i=0;i<secondaryMenuLinks.length;i++){
                            var curWidth = $(secondaryMenuLinks[i]).outerWidth(true);
                            secondaryMenuTabsInnerWidth += curWidth;
                        }

                        var blockIsClipped = (secondaryMenuTabsInnerWidth > secondaryMenuTabsWidth);

                        if(blockIsClipped) {
                            secondaryMenuTabsBlock.parents('.secondary-menu__side').addClass('blockIsClipped');
                        } else {
                            secondaryMenuTabsBlock.parents('.secondary-menu__side').removeClass('blockIsClipped');
                        }

                        $('#second-menu-list').on('scroll touch', function () {
                            var thisScrollLeft = $(this).scrollLeft(),
                                thisWidth = $(this).innerWidth();

                            (secondaryMenuTabsInnerWidth > thisWidth) ? $(this).parents('.secondary-menu__side').addClass('blockIsClipped') : $(this).parents('.secondary-menu__side').removeClass('blockIsClipped');
                            if (thisScrollLeft && thisScrollLeft + thisWidth){
                                $(this).parents('.secondary-menu__side').addClass('scrolledLeft')
                            } else {
                                $(this).parents('.secondary-menu__side').removeClass('scrolledLeft')
                            }

                            if (thisScrollLeft && ((thisScrollLeft + thisWidth) > secondaryMenuTabsInnerWidth )){
                                // $(this).removeClass('scrolledLeft');
                                $(this).parents('.secondary-menu__side').addClass('scrolledFullRight');
                            } else {
                                $(this).parents('.secondary-menu__side').removeClass('scrolledFullRight');
                            }

                        })
                    }


                }
                checkWindowWidth();

                $(window).resize(function () {
                        checkWindowWidth();
                    }
                );
            }

            // move search bar to bottom on mobiles
            function moveSearchToBottom() {
              function moveSearchToBottomIfMobile() {
                var windowWidth = window.innerWidth,
                  mobileContainer = $('.mob-menu-container'),
                  searchBlock = $('.header:not(.small) .search-n-lang'),
                  mobileFooter = mobileContainer.find('.mob-menu-footer .mob-controls-wr');
                if (windowWidth <= 991){
                  searchBlock.prependTo(mobileFooter);
                } else {
                  mobileFooter.find('.search-n-lang').appendTo('.header:not(.small) > .container');
                }
              }
              moveSearchToBottomIfMobile();

              $(window).resize(function () {
                  moveSearchToBottomIfMobile();
                }
              );
            }

            // move search bar to bottom on mobiles
            setTimeout(moveSearchToBottom, 0);

            // breadcrumbs & tabs slider
            setTimeout(breadcrumbsTabsSlider, 0);

            // freeForm / freeform Plus toggler
            function ffToggler() {
                var _toggler = $(".ff-tabs-toggler-block .ff-togglers");
                _toggler.each(function () {
                    var self = $(this);
                    self.on('click', function () {
                        var _names = $('.ff-tab');
                        _toggler.removeClass('active');
                        self.addClass('active');
                        var _activeTab = $(".ff-tabs-toggler-block .ff-togglers.active").data('target');
                        _names.addClass('hidden').attr('style', '');

                        _names.each(function () {
                            if($(this).hasClass(_activeTab)){
                                $(this).removeClass('hidden').attr('style', 'display: inline');
                            }
                        })
                    })
                })
            }
            ffToggler();

            //Height of last scanner block on front page
            function scannerBlockPosition() {
              var scannersFrontFirst = $('#block-bean-3d-scanners-on-front-first').find('.scanners-front__first'),
                  scannersFrontSecond = $('.scanners-front__second');

              if(scannersFrontFirst.length){
                if (window.innerWidth >= 992 && !(scannersFrontFirst.find(scannersFrontSecond).length)) {
                  scannersFrontSecond.appendTo(scannersFrontFirst.find('.anyb-row'))
                } else if(window.innerWidth <= 991 && scannersFrontFirst.find(scannersFrontSecond).length) {
                  scannersFrontSecond.appendTo($('#block-bean-3d-scanners-on-front-second').find('.content'))
                }
              }
            }

            scannerBlockPosition();
            $(window).resize(function () {
              scannerBlockPosition();
            });
        }
    }
}(jQuery));

;/*})'"*/
;/*})'"*/
(function($){var updateWebformUrlTitle=function(){if(typeof $('h1').html()!='undefined'){var title=$('h1').html().trim()}else title=document.title;var url=window.location.href,rurl=document.referrer;setTimeout(function(){$('.webform-component--hidden-info input').val(title);$('.webform-component--hidden-info-url input').val(url);$('.webform-component--hidden-info-rurl input').val(rurl)},20)};$(document).ajaxSuccess(function(){updateWebformUrlTitle()});updateWebformUrlTitle();$(document).ready(function(){$('.chosen-select').on('chosen:no_results',function(e,params){var $this=$(this),$component=$this.closest('.webform-component');if($component.hasClass('webform-component-select-or-other')){var $container=$component.find('.chosen-container'),input=$container.find('.chosen-search-input').val();$container.find('.chosen-single span').text(input);$this.val('select_or_other');$component.find('.select-or-other-other').val(input)}})})})(jQuery);;/*})'"*/
(function($){$(document).ready(function(){if(!!$('.page-node-941').size()){winHeight=$(window).height();headHeight=$('.header.small').height()+$('#secondary-menu').height();$('#block-bean-scan-app-top-big-image .big-block').height(winHeight-headHeight-100)}})}(jQuery));;/*})'"*/
(function($){$(document).ready(function(){if(!!$('.page-node-925').size()){show();var wrapper=$('.as11-compare-wrapper');wrapper.each(function(i,el){el.addEventListener("mousemove",moveHandle,false);el.addEventListener("touchmove",moveHandle,false)})}})
function show(){var width=$('.as11-compare-wrapper').width()-$('.as11-compare-divider').position().left;$('.as11-compare-right').width(width)}
function moveHandle(e){var divider=$(this).find('.as11-compare-divider'),touch=e.pageX||e.touches[0].pageX,position=touch-$(this).offset().left;if(position<$(this).width()&&position>0){divider.css("left",position);var width=$(this).width()-divider.position().left;$(this).find('.as11-compare-right').width(width)}}}(jQuery));;/*})'"*/
/*! jQuery UI - v1.12.1 - 2017-01-21
* http://jqueryui.com
* Includes: widget.js, position.js, keycode.js, unique-id.js, widgets/autocomplete.js, widgets/menu.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){t.ui=t.ui||{},t.ui.version="1.12.1";var e=0,i=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},l=e.split(".")[0];e=e.split(".")[1];var h=l+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][h.toLowerCase()]=function(e){return!!t.data(e,h)},t[l]=t[l]||{},n=t[l][e],o=t[l][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:l,widgetName:e,widgetFullName:h}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var s,n,o=i.call(arguments,1),a=0,r=o.length;r>a;a++)for(s in o[a])n=o[a][s],o[a].hasOwnProperty(s)&&void 0!==n&&(e[s]=t.isPlainObject(n)?t.isPlainObject(e[s])?t.widget.extend({},e[s],n):t.widget.extend({},n):n);return e},t.widget.bridge=function(e,s){var n=s.prototype.widgetFullName||e;t.fn[e]=function(o){var a="string"==typeof o,r=i.call(arguments,1),l=this;return a?this.length||"instance"!==o?this.each(function(){var i,s=t.data(this,n);return"instance"===o?(l=s,!1):s?t.isFunction(s[o])&&"_"!==o.charAt(0)?(i=s[o].apply(s,r),i!==s&&void 0!==i?(l=i&&i.jquery?l.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+o+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+o+"'")}):l=void 0:(r.length&&(o=t.widget.extend.apply(null,[o].concat(r))),this.each(function(){var e=t.data(this,n);e?(e.option(o||{}),e._init&&e._init()):t.data(this,n,new s(o,this))})),l}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(i,s){s=t(s||this.defaultElement||this)[0],this.element=t(s),this.uuid=e++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},s!==this&&(t.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===s&&this.destroy()}}),this.document=t(s.style?s.ownerDocument:s.document||s),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),i),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+o.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(u.test(t[0])?e/100:1),parseFloat(t[1])*(u.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var u,p,f,g,m,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,g=_.offset,m=t.extend({},g),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",t=h.exec(i[0]),e=h.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?m.left+=p:"center"===n.at[0]&&(m.left+=p/2),"bottom"===n.at[1]?m.top+=f:"center"===n.at[1]&&(m.top+=f/2),u=e(k.at,p,f),m.left+=u[0],m.top+=u[1],this.each(function(){var s,r,l=t(this),h=l.outerWidth(),c=l.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),x=h+d+i(this,"marginRight")+y.width,C=c+_+i(this,"marginBottom")+y.height,D=t.extend({},m),T=e(k.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?D.left-=h:"center"===n.my[0]&&(D.left-=h/2),"bottom"===n.my[1]?D.top-=c:"center"===n.my[1]&&(D.top-=c/2),D.left+=T[0],D.top+=T[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](D,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:c,collisionPosition:s,collisionWidth:x,collisionHeight:C,offset:[u[0]+T[0],u[1]+T[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(r=function(t){var e=g.left-D.left,i=e+p-h,s=g.top-D.top,r=s+f-c,u={target:{element:v,left:g.left,top:g.top,width:p,height:f},element:{element:l,left:D.left,top:D.top,width:h,height:c},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};h>p&&p>a(e+i)&&(u.horizontal="center"),c>f&&f>a(s+r)&&(u.vertical="middle"),u.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,u)}),l.offset(t.extend(D,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,l=n-r,h=r+e.collisionWidth-a-n;e.collisionWidth>a?l>0&&0>=h?(i=t.left+l+e.collisionWidth-a-n,t.left+=l-i):t.left=h>0&&0>=l?n:l>h?n+a-e.collisionWidth:n:l>0?t.left+=l:h>0?t.left-=h:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,l=n-r,h=r+e.collisionHeight-a-n;e.collisionHeight>a?l>0&&0>=h?(i=t.top+l+e.collisionHeight-a-n,t.top+=l-i):t.top=h>0&&0>=l?n:l>h?n+a-e.collisionHeight:n:l>0?t.top+=l:h>0?t.top-=h:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=t.left-e.collisionPosition.marginLeft,c=h-l,u=h+e.collisionWidth-r-l,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-l,(s>0||u>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=t.top-e.collisionPosition.marginTop,c=h-l,u=h+e.collisionHeight-r-l,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-r-o,(0>s||a(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-l,(i>0||u>a(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.fn.extend({uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target),s=t(t.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.target).closest(".ui-menu-item"),s=t(e.currentTarget);i[0]===s[0]&&(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(e,s))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){var i=!t.contains(this.element[0],t.ui.safeActiveElement(this.document[0]));i&&this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){var e=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),i=e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),i.children().each(function(){var e=t(this);e.data("ui-menu-submenu-caret")&&e.remove()})},_keydown:function(e){var i,s,n,o,a=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:a=!1,s=this.previousFilter||"",o=!1,n=e.keyCode>=96&&105>=e.keyCode?""+(e.keyCode-96):String.fromCharCode(e.keyCode),clearTimeout(this.filterTimer),n===s?o=!0:n=s+n,i=this._filterMenuItems(n),i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(e.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(e,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}a&&e.preventDefault()},_activate:function(t){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i,s,n,o,a=this,r=this.options.icons.submenu,l=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),s=l.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.prev(),s=t("<span>").data("ui-menu-submenu-caret",!0);a._addClass(s,"ui-menu-icon","ui-icon "+r),i.attr("aria-haspopup","true").prepend(s),e.attr("aria-labelledby",i.attr("id"))}),this._addClass(s,"ui-menu","ui-widget ui-widget-content ui-front"),e=l.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);a._isDivider(e)&&a._addClass(e,"ui-menu-divider","ui-widget-content")}),n=i.not(".ui-menu-item, .ui-menu-divider"),o=n.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(n,"ui-menu-item")._addClass(o,"ui-menu-item-wrapper"),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){if("icons"===t){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,e.submenu)}this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t+""),this._toggleClass(null,"ui-state-disabled",!!t)},focus:function(t,e){var i,s,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.outerHeight(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",t,{item:this.active}),this.active=null)},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(e),void 0)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first())),void 0):(this.next(e),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))})}}),t.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,a="input"===n;this.isMultiLine=o||!a&&this._isContentEditable(this.element),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,void 0;e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),void 0):(this._searchTimeout(t),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(t),this._change(t),void 0)}}),this._initSource(),this.menu=t("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==t.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(e,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:n})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&t.trim(s).length&&(this.liveRegion.children().hide(),t("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,i){var s=i.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==t.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=n,this._delay(function(){this.previous=n,this.selectedItem=s})),!1!==this._trigger("select",e,{item:s})&&this._value(s.value),this.term=this._value(),this.close(e),this.selectedItem=s}}),this.liveRegion=t("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(e){var i=this.menu.element[0];return e.target===this.element[0]||e.target===i||t.contains(i,e.target)},_closeOnClickOutside:function(t){this._isEventTargetInWidget(t)||this.close()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){var e=this.term===this._value(),i=this.menu.element.is(":visible"),s=t.altKey||t.ctrlKey||t.metaKey||t.shiftKey;(!e||e&&!i&&!s)&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):void 0},_search:function(t){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<div>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[t](e),void 0):(this.search(null,e),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())},_isContentEditable:function(t){if(!t.length)return!1;var e=t.prop("contentEditable");return"inherit"===e?this._isContentEditable(t.parent()):"true"===e}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),t("<div>").text(i).appendTo(this.liveRegion))}}),t.ui.autocomplete});
;/*})'"*/
;/*})'"*/
