"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2526],{66291:(A,b,i)=>{i.d(b,{mw:()=>D,Ql:()=>M,lc:()=>y,Cu:()=>w,$k:()=>B});var t=i(83668),g=i(49133),v=i(23405),P=i(78526),C=i(16087),x=i(6636),h=i(75722),l=i(18735),c=i(28805),u=i(38053),O=i(93049),f=i(76734);class D{}class M{}const y=new t.OlP("Datepicker Adapter"),w=new t.OlP("Date service options");let B=(()=>{class S{constructor(r,T,R,V,H){this.document=r,this.datepickerAdapters=T,this.hostRef=R,this.dateService=V,this.changeDetector=H,this.destroy$=new v.xQ,this.isDatepickerReady=!1,this.onChange=()=>{},this.onTouched=()=>{},this.validator=g.kI.compose([this.parseValidator,this.minValidator,this.maxValidator,this.filterValidator].map($=>$.bind(this))),this.subscribeOnInputChange()}set setPicker(r){this.picker=r,this.setupPicker()}get input(){return this.hostRef.nativeElement}get inputValue(){return this.input.value}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}writeValue(r){this.isDatepickerReady?(this.writePicker(r),this.writeInput(r)):this.queue=r}registerOnChange(r){this.onChange=r}registerOnTouched(r){this.onTouched=r}setDisabledState(r){this.input.disabled=r}validate(){return this.validator(null)}hidePicker(){this.input.focus(),this.picker.hide()}parseValidator(){return""===this.inputValue||this.datepickerAdapter.isValid(this.inputValue,this.picker.format)?null:{nbDatepickerParse:{value:this.inputValue}}}minValidator(){const r=this.picker.getValidatorConfig(),T=this.datepickerAdapter.parse(this.inputValue,this.picker.format);return!r.min||!T||this.dateService.compareDates(r.min,T)<=0?null:{nbDatepickerMin:{min:r.min,actual:T}}}maxValidator(){const r=this.picker.getValidatorConfig(),T=this.datepickerAdapter.parse(this.inputValue,this.picker.format);return!r.max||!T||this.dateService.compareDates(r.max,T)>=0?null:{nbDatepickerMax:{max:r.max,actual:T}}}filterValidator(){const r=this.picker.getValidatorConfig(),T=this.datepickerAdapter.parse(this.inputValue,this.picker.format);return r.filter&&T&&!r.filter(T)?{nbDatepickerFilter:!0}:null}chooseDatepickerAdapter(){if(this.datepickerAdapter=this.datepickerAdapters.find(({picker:r})=>this.picker instanceof r),this.noDatepickerAdapterProvided())throw new Error("No datepickerAdapter provided for picker")}setupPicker(){this.chooseDatepickerAdapter(),this.picker.attach(this.hostRef),this.inputValue&&(this.picker.value=this.datepickerAdapter.parse(this.inputValue,this.picker.format)),this.isDatepickerReady||this.picker.init.pipe((0,x.q)(1),(0,h.b)(()=>this.isDatepickerReady=!0),(0,l.h)(()=>!!this.queue),(0,c.R)(this.destroy$)).subscribe(()=>{this.writeValue(this.queue),this.changeDetector.detectChanges(),this.queue=void 0}),this.picker.valueChange.pipe((0,c.R)(this.destroy$)).subscribe(r=>{this.writePicker(r),this.writeInput(r),this.onChange(r),this.picker.shouldHide()&&this.hidePicker()}),(0,P.T)(this.picker.blur,(0,C.R)(this.input,"blur").pipe((0,l.h)(()=>!this.picker.isShown&&this.document.activeElement!==this.input))).pipe((0,c.R)(this.destroy$)).subscribe(()=>this.onTouched())}writePicker(r){this.picker.value=r}writeInput(r){this.hostRef.nativeElement.value=this.datepickerAdapter.format(r,this.picker.format)}noDatepickerAdapterProvided(){return!(this.datepickerAdapter&&this.datepickerAdapter instanceof D)}subscribeOnInputChange(){(0,C.R)(this.input,"input").pipe((0,u.U)(()=>this.inputValue),(0,c.R)(this.destroy$)).subscribe(r=>this.handleInputChange(r))}handleInputChange(r){const T=this.parseInputValue(r);this.onChange(T),this.writePicker(T)}parseInputValue(r){return this.datepickerAdapter.isValid(r,this.picker.format)?this.datepickerAdapter.parse(r,this.picker.format):null}}return S.\u0275fac=function(r){return new(r||S)(t.Y36(O.qT),t.Y36(y),t.Y36(t.SBq),t.Y36(f.u),t.Y36(t.sBO))},S.\u0275dir=t.lG2({type:S,selectors:[["input","nbDatepicker",""]],inputs:{setPicker:["nbDatepicker","setPicker"]},features:[t._Bn([{provide:g.JU,useExisting:(0,t.Gpc)(()=>S),multi:!0},{provide:g.Cf,useExisting:(0,t.Gpc)(()=>S),multi:!0}])]}),S})()},91891:(A,b,i)=>{i.d(b,{s:()=>Z});var t=i(83668),g=i(53314),v=i(88178),P=i(48212);function C(_=0,a=v.P){return(!(0,P.k)(_)||_<0)&&(_=0),(!a||"function"!=typeof a.schedule)&&(a=v.P),new g.y(o=>(o.add(a.schedule(x,_,{subscriber:o,counter:0,period:_})),o))}function x(_){const{subscriber:a,counter:o,period:p}=_;a.next(o),this.schedule({subscriber:a,counter:o+1,period:p},p)}var h=i(23405),l=i(34099),c=i(78526),u=i(69279),O=i(22411),f=i(36813),D=i(38345);const M={leading:!0,trailing:!1};function y(_,a=M){return o=>o.lift(new w(_,!!a.leading,!!a.trailing))}class w{constructor(a,o,p){this.durationSelector=a,this.leading=o,this.trailing=p}call(a,o){return o.subscribe(new B(a,this.durationSelector,this.leading,this.trailing))}}class B extends D.Ds{constructor(a,o,p,k){super(a),this.destination=a,this.durationSelector=o,this._leading=p,this._trailing=k,this._hasValue=!1}_next(a){this._hasValue=!0,this._sendValue=a,this._throttled||(this._leading?this.send():this.throttle(a))}send(){const{_hasValue:a,_sendValue:o}=this;a&&(this.destination.next(o),this.throttle(o)),this._hasValue=!1,this._sendValue=void 0}throttle(a){const o=this.tryDurationSelector(a);o&&this.add(this._throttled=(0,D.ft)(o,new D.IY(this)))}tryDurationSelector(a){try{return this.durationSelector(a)}catch(o){return this.destination.error(o),null}}throttlingDone(){const{_throttled:a,_trailing:o}=this;a&&a.unsubscribe(),this._throttled=void 0,o&&this.send()}notifyNext(){this.throttlingDone()}notifyComplete(){this.throttlingDone()}}var S=i(18735),I=i(79204),r=i(28805),T=i(6636),R=i(38053),V=i(38580),H=i(59490),$=i(69627),L=i(39468);let Z=(()=>{class _{constructor(o,p,k){this.elementRef=o,this.scrollService=p,this.dimensionsService=k,this.destroy$=new h.xQ,this.windowScroll=!1,this.elementScroll$=new h.xQ,this.windowScroll$=this.scrollService.onScroll().pipe((0,S.h)(()=>this.windowScroll)),this.bottomThreshold$=new h.xQ,this.topThreshold$=new h.xQ,this.throttleTime$=new l.X(0),this.bottomThreshold=new t.vpe(!0),this.topThreshold=new t.vpe(!0)}get elementScroll(){return!this.windowScroll}set throttleTime(o){this.throttleTime$.next(o)}get throttleTime(){return this.throttleTime$.value}set listenWindowScroll(o){this.windowScroll=(0,V.e)(o)}onElementScroll(){this.elementScroll&&this.elementScroll$.next()}ngAfterViewInit(){(0,c.T)(this.windowScroll$,this.elementScroll$).pipe((0,I.w)(()=>this.getContainerDimensions()),(0,r.R)(this.destroy$)).subscribe(o=>this.checkPosition(o)),this.throttleTime$.pipe((0,I.w)(()=>this.topThreshold$.pipe(y(()=>C(this.throttleTime)))),(0,r.R)(this.destroy$)).subscribe(()=>{this.topThreshold.emit()}),this.throttleTime$.pipe((0,I.w)(()=>this.bottomThreshold$.pipe(y(()=>C(this.throttleTime)))),(0,r.R)(this.destroy$)).subscribe(()=>{this.bottomThreshold.emit()}),this.listItems.changes.pipe((0,I.w)(()=>C(50).pipe((0,S.h)(()=>this.inSyncWithDom()),(0,T.q)(1),(0,r.R)((0,u.H)(1e3)))),(0,I.w)(()=>this.getContainerDimensions()),(0,r.R)(this.destroy$)).subscribe(o=>this.checkPosition(o)),this.getContainerDimensions().subscribe(o=>this.checkPosition(o))}ngOnDestroy(){this.topThreshold$.complete(),this.bottomThreshold$.complete(),this.elementScroll$.complete(),this.destroy$.next(),this.destroy$.complete()}checkPosition({scrollHeight:o,scrollTop:p,clientHeight:k}){const N=null==this.lastScrollPosition,n=p<this.lastScrollPosition;(N||this.lastScrollPosition===p||p>this.lastScrollPosition)&&o-p-k<=this.threshold&&this.bottomThreshold$.next(),(N||n)&&p<=this.threshold&&this.topThreshold$.next(),this.lastScrollPosition=p}getContainerDimensions(){if(this.elementScroll){const{scrollTop:o,scrollHeight:p,clientHeight:k}=this.elementRef.nativeElement;return(0,O.of)({scrollTop:o,scrollHeight:p,clientHeight:k})}return(0,f.D)([this.scrollService.getPosition(),this.dimensionsService.getDimensions()]).pipe((0,R.U)(([o,p])=>({scrollTop:o.y,scrollHeight:p.scrollHeight,clientHeight:p.clientHeight})))}inSyncWithDom(){return this.elementRef.nativeElement.children.length===this.listItems.length}}return _.\u0275fac=function(o){return new(o||_)(t.Y36(t.SBq),t.Y36($.H),t.Y36(L.m))},_.\u0275dir=t.lG2({type:_,selectors:[["","nbInfiniteList",""]],contentQueries:function(o,p,k){if(1&o&&t.Suo(k,H.q,4),2&o){let N;t.iGM(N=t.CRH())&&(p.listItems=N)}},hostBindings:function(o,p){1&o&&t.NdJ("scroll",function(){return p.onElementScroll()})},inputs:{threshold:"threshold",throttleTime:"throttleTime",listenWindowScroll:"listenWindowScroll"},outputs:{bottomThreshold:"bottomThreshold",topThreshold:"topThreshold"}}),_})()},6283:(A,b,i)=>{i.d(b,{B:()=>C});var t=i(83668),g=i(28805),v=i(23405),P=i(59490);let C=(()=>{class x{constructor(){this.destroy$=new v.xQ,this.startPage=1,this.pageChange=new t.vpe,this.observer=new IntersectionObserver(l=>this.checkForPageChange(l),{threshold:.5})}ngAfterViewInit(){this.listItems&&this.listItems.length&&this.observeItems(),this.listItems.changes.pipe((0,g.R)(this.destroy$)).subscribe(()=>this.observeItems())}ngOnDestroy(){this.observer.disconnect&&this.observer.disconnect()}observeItems(){this.listItems.forEach(l=>this.observer.observe(l.nativeElement))}checkForPageChange(l){const c=this.findMostVisiblePage(l);c&&this.currentPage!==c&&(this.currentPage=c,this.pageChange.emit(this.currentPage))}findMostVisiblePage(l){const c=new Map;for(const f of l){if(f.intersectionRatio<.5)continue;const D=this.elementIndex(f.target);if(-1===D)continue;const M=this.startPage+Math.floor(D/this.pageSize);let y=f.intersectionRatio;c.has(M)&&(y+=c.get(M)),c.set(M,y)}let O,u=0;return c.forEach((f,D)=>{f>u&&(u=f,O=D)}),O}elementIndex(l){return l.parentElement&&l.parentElement.children?Array.from(l.parentElement.children).indexOf(l):-1}}return x.\u0275fac=function(l){return new(l||x)},x.\u0275dir=t.lG2({type:x,selectors:[["","nbListPageTracker",""]],contentQueries:function(l,c,u){if(1&l&&t.Suo(u,P.q,4,t.SBq),2&l){let O;t.iGM(O=t.CRH())&&(c.listItems=O)}},inputs:{pageSize:"pageSize",startPage:"startPage"},outputs:{pageChange:"pageChange"}}),x})()},59490:(A,b,i)=>{i.d(b,{z:()=>C,q:()=>x});var t=i(83668);const g=[[["nb-list-item"]]],v=["nb-list-item"],P=["*"];let C=(()=>{class h{constructor(){this.role="list"}}return h.\u0275fac=function(c){return new(c||h)},h.\u0275cmp=t.Xpm({type:h,selectors:[["nb-list"]],hostVars:1,hostBindings:function(c,u){2&c&&t.uIk("role",u.role)},inputs:{role:"role"},ngContentSelectors:v,decls:1,vars:0,template:function(c,u){1&c&&(t.F$t(g),t.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;flex:1 1 auto;overflow:auto}"]}),h})(),x=(()=>{class h{constructor(){this.role="listitem"}}return h.\u0275fac=function(c){return new(c||h)},h.\u0275cmp=t.Xpm({type:h,selectors:[["nb-list-item"]],hostVars:1,hostBindings:function(c,u){2&c&&t.uIk("role",u.role)},inputs:{role:"role"},ngContentSelectors:P,decls:1,vars:0,template:function(c,u){1&c&&(t.F$t(),t.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;align-items:center;flex-shrink:0}"]}),h})()},62335:(A,b,i)=>{i.d(b,{C:()=>x}),i(59490),i(6283),i(91891);var P=i(83668);let x=(()=>{class h{}return h.\u0275fac=function(c){return new(c||h)},h.\u0275mod=P.oAB({type:h}),h.\u0275inj=P.cJS({}),h})()},3164:(A,b,i)=>{i.d(b,{P:()=>g,l:()=>v});const g=new(i(83668).OlP)("NB_TIME_PICKER_CONFIG"),v={hoursText:"Hr",minutesText:"Min",secondsText:"Sec",ampmText:"Am/Pm"}},33935:(A,b,i)=>{i.d(b,{e:()=>U});var t=i(83668),g=i(23405),v=i(38580),P=i(38112),C=i(15978),x=i(3164),h=i(51296),l=i(12613),c=i(76734),u=i(60634),O=i(86019),f=i(59490),D=i(18735),M=i(6636),y=i(28805),w=i(78526);const B=["valueContainer"];let S=(()=>{class n{constructor(e,s){this.ngZone=e,this.platformService=s,this.selectedChange$=new g.xQ,this.unselected$=this.selectedChange$.pipe((0,D.h)(m=>!m)),this.destroy$=new g.xQ,this.select=new t.vpe}set selected(e){e&&(this._selected=e,this.scrollToElement()),this.selectedChange$.next(e)}get selected(){return this._selected}onClick(){this.select.emit({value:this.value})}ngAfterViewInit(){this.selected&&this.ngZone.onStable.pipe((0,M.q)(1),(0,y.R)((0,w.T)(this.unselected$,this.destroy$))).subscribe(()=>this.scrollToElement())}scrollToElement(){this.valueContainerElement&&this.platformService.isBrowser&&this.ngZone.runOutsideAngular(()=>this.valueContainerElement.nativeElement.scrollIntoView({block:"center"}))}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.R0b),t.Y36(h.h))},n.\u0275cmp=t.Xpm({type:n,selectors:[["nb-timepicker-cell"]],viewQuery:function(e,s){if(1&e&&t.Gf(B,5),2&e){let m;t.iGM(m=t.CRH())&&(s.valueContainerElement=m.first)}},hostBindings:function(e,s){1&e&&t.NdJ("click",function(){return s.onClick()})},inputs:{selected:"selected",value:"value"},outputs:{select:"select"},decls:3,vars:1,consts:[["valueContainer",""]],template:function(e,s){1&e&&(t.TgZ(0,"div",null,0),t._uU(2),t.qZA()),2&e&&(t.xp6(2),t.Oqu(s.value))},styles:["[_nghost-%COMP%]{width:100%;height:100%;display:flex;align-items:center;justify-content:center;-webkit-user-select:none;-ms-user-select:none;user-select:none}"],changeDetection:0}),n})();var I=i(95071);function r(n,d){1&n&&(t.ynx(0),t.TgZ(1,"div",8),t._uU(2,"Time"),t.qZA(),t.BQk())}function T(n,d){if(1&n&&(t.TgZ(0,"div",8),t._uU(1),t.qZA()),2&n){const e=t.oxw(3);t.xp6(1),t.Oqu(e.secondsText)}}function R(n,d){if(1&n&&(t.TgZ(0,"div",8),t._uU(1),t.qZA()),2&n){const e=t.oxw(3);t.xp6(1),t.Oqu(e.ampmText)}}function V(n,d){if(1&n&&(t.TgZ(0,"div",8),t._uU(1),t.qZA(),t.TgZ(2,"div",8),t._uU(3),t.qZA(),t.YNc(4,T,2,1,"div",9),t.YNc(5,R,2,1,"div",9)),2&n){const e=t.oxw(2);t.xp6(1),t.Oqu(e.hoursText),t.xp6(2),t.Oqu(e.minutesText),t.xp6(1),t.Q6J("ngIf",e.withSeconds),t.xp6(1),t.Q6J("ngIf",e.twelveHoursFormat)}}function H(n,d){if(1&n){const e=t.EpF();t.TgZ(0,"nb-list-item",12),t.TgZ(1,"nb-timepicker-cell",13),t.NdJ("select",function(){const E=t.CHM(e).$implicit;return t.oxw(3).selectFullTime(E)}),t.qZA(),t.qZA()}if(2&n){const e=d.$implicit,s=t.oxw(3);t.ekj("selected",s.isSelectedFullTimeValue(e)),t.xp6(1),t.Q6J("value",s.getFullTimeString(e))("selected",s.isSelectedFullTimeValue(e))}}function $(n,d){if(1&n&&(t.ynx(0),t.TgZ(1,"nb-list",10),t.YNc(2,H,2,4,"nb-list-item",11),t.qZA(),t.BQk()),2&n){const e=t.oxw(2);t.xp6(2),t.Q6J("ngForOf",e.fullTimeOptions)("ngForTrackBy",e.trackBySingleColumnValue.bind(e))}}function L(n,d){if(1&n){const e=t.EpF();t.TgZ(0,"nb-list-item",12),t.TgZ(1,"nb-timepicker-cell",13),t.NdJ("select",function(){const E=t.CHM(e).$implicit;return t.oxw(3).setHour(E.value)}),t.qZA(),t.qZA()}if(2&n){const e=d.$implicit,s=t.oxw(3);t.ekj("selected",s.isSelectedHour(e.value)),t.xp6(1),t.Q6J("value",e.text)("selected",s.isSelectedHour(e.value))}}function W(n,d){if(1&n){const e=t.EpF();t.TgZ(0,"nb-list-item",12),t.TgZ(1,"nb-timepicker-cell",13),t.NdJ("select",function(){const E=t.CHM(e).$implicit;return t.oxw(3).setMinute(E.value)}),t.qZA(),t.qZA()}if(2&n){const e=d.$implicit,s=t.oxw(3);t.ekj("selected",s.isSelectedMinute(e.value)),t.xp6(1),t.Q6J("value",e.text)("selected",s.isSelectedMinute(e.value))}}function Z(n,d){if(1&n){const e=t.EpF();t.TgZ(0,"nb-list-item",12),t.TgZ(1,"nb-timepicker-cell",13),t.NdJ("select",function(){const E=t.CHM(e).$implicit;return t.oxw(4).setSecond(E.value)}),t.qZA(),t.qZA()}if(2&n){const e=d.$implicit,s=t.oxw(4);t.ekj("selected",s.isSelectedSecond(e.value)),t.xp6(1),t.Q6J("value",e.text)("selected",s.isSelectedSecond(e.value))}}function _(n,d){if(1&n&&(t.TgZ(0,"nb-list",10),t.YNc(1,Z,2,4,"nb-list-item",11),t.qZA()),2&n){const e=t.oxw(3);t.xp6(1),t.Q6J("ngForOf",e.secondsColumnOptions)("ngForTrackBy",e.trackByTimeValues)}}function a(n,d){if(1&n){const e=t.EpF();t.TgZ(0,"nb-list-item",16),t.TgZ(1,"nb-timepicker-cell",13),t.NdJ("select",function(){const E=t.CHM(e).$implicit;return t.oxw(4).changeDayPeriod(E)}),t.qZA(),t.qZA()}if(2&n){const e=d.$implicit,s=t.oxw(4);t.ekj("selected",s.isSelectedDayPeriod(e)),t.xp6(1),t.Q6J("value",e)("selected",s.isSelectedDayPeriod(e))}}function o(n,d){if(1&n&&(t.TgZ(0,"nb-list",10),t.YNc(1,a,2,4,"nb-list-item",15),t.qZA()),2&n){const e=t.oxw(3);t.xp6(1),t.Q6J("ngForOf",e.dayPeriodColumnOptions)("ngForTrackBy",e.trackByDayPeriod)}}function p(n,d){if(1&n&&(t.TgZ(0,"nb-list",10),t.YNc(1,L,2,4,"nb-list-item",11),t.qZA(),t.TgZ(2,"nb-list",10),t.YNc(3,W,2,4,"nb-list-item",11),t.qZA(),t.YNc(4,_,2,2,"nb-list",14),t.YNc(5,o,2,2,"nb-list",14)),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",e.hoursColumnOptions)("ngForTrackBy",e.trackByTimeValues),t.xp6(2),t.Q6J("ngForOf",e.minutesColumnOptions)("ngForTrackBy",e.trackByTimeValues),t.xp6(1),t.Q6J("ngIf",e.showSeconds()),t.xp6(1),t.Q6J("ngIf",e.twelveHoursFormat)}}function k(n,d){if(1&n){const e=t.EpF();t.TgZ(0,"nb-card-footer",17),t.TgZ(1,"nb-calendar-actions",18),t.NdJ("setCurrentTime",function(){return t.CHM(e),t.oxw(2).setCurrentTime()})("saveValue",function(){return t.CHM(e),t.oxw(2).saveValue()}),t.qZA(),t.qZA()}if(2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("applyButtonText",e.applyButtonText)("currentTimeButtonText",e.currentTimeButtonText)}}function N(n,d){if(1&n&&(t.TgZ(0,"nb-card",1),t.TgZ(1,"nb-card-header",2),t.YNc(2,r,3,0,"ng-container",3),t.YNc(3,V,6,4,"ng-template",null,4,t.W1O),t.qZA(),t.TgZ(5,"div",5),t.YNc(6,$,3,2,"ng-container",3),t.YNc(7,p,6,6,"ng-template",null,6,t.W1O),t.qZA(),t.YNc(9,k,2,2,"nb-card-footer",7),t.qZA()),2&n){const e=t.MAs(4),s=t.MAs(8),m=t.oxw();t.ekj("supports-scrollbar-theming",!m.isFirefox()),t.xp6(2),t.Q6J("ngIf",m.singleColumn)("ngIfElse",e),t.xp6(4),t.Q6J("ngIf",m.singleColumn)("ngIfElse",s),t.xp6(3),t.Q6J("ngIf",m.showFooter)}}let U=(()=>{class n{constructor(e,s,m,E,F,Q){this.config=e,this.platformService=s,this.cd=E,this.calendarTimeModelService=F,this.dateService=Q,this.blur$=new g.xQ,this.dayPeriodColumnOptions=["AM","PM"],this.isAM=!0,this.showFooter=!0,this.onSelectTime=new t.vpe,this.initFromConfig(this.config)}get blur(){return this.blur$.asObservable()}get timeFormat(){return this._timeFormat}set timeFormat(e){this._timeFormat=e}get twelveHoursFormat(){return this._twelveHoursFormat}set twelveHoursFormat(e){this._twelveHoursFormat=(0,v.e)(e)}get withSeconds(){return this._withSeconds}set withSeconds(e){this._withSeconds=(0,v.e)(e)}get singleColumn(){return this._singleColumn}set singleColumn(e){this._singleColumn=(0,v.e)(e)}set step(e){this._step=e}get step(){return this._step}set date(e){this._date=e,this.isAM="AM"===this.dateService.getDayPeriod(this.date),this.buildColumnOptions(),this.cd.markForCheck()}get date(){return this._date}ngOnInit(){this.timeFormat=this.setupTimeFormat()}ngOnChanges({step:e,twelveHoursFormat:s,withSeconds:m,singleColumn:E}){this.timeFormat=this.setupTimeFormat(),(e||s||m||E||!this.fullTimeOptions)&&this.buildColumnOptions()}setHost(e){this.hostRef=e}attach(e){this.hostRef=e}setCurrentTime(){this.date=this.dateService.today(),this.onSelectTime.emit({time:this.date,save:!0})}setHour(e){this.updateValue(this.dateService.setHours(this.date,e))}setMinute(e){this.updateValue(this.dateService.setMinutes(this.date,e))}setSecond(e){this.updateValue(this.dateService.setSeconds(this.date,e))}selectFullTime(e){this.updateValue(e)}changeDayPeriod(e){this.dateService.getDayPeriod(this.date)!==e&&this.updateValue(this.dateService.addHours(this.date,("AM"===e?-1:1)*this.dateService.HOURS_IN_DAY_PERIOD))}updateValue(e){this.onSelectTime.emit({time:e})}saveValue(){this.onSelectTime.emit({time:this.date,save:!0})}trackByTimeValues(e,s){return s.value}trackBySingleColumnValue(e,s){return this.dateService.valueOf(s)}trackByDayPeriod(e,s){return s}showSeconds(){return this.withSeconds&&!this.singleColumn}isSelectedHour(e){return!!this.date&&this.dateService.getHours(this.date)===e}isSelectedMinute(e){return!!this.date&&this.dateService.getMinutes(this.date)===e}isSelectedSecond(e){return!!this.date&&this.dateService.getSeconds(this.date)===e}isSelectedDayPeriod(e){return!!this.date&&e===this.dateService.getDayPeriod(this.date)}getFullTimeString(e){return this.dateService.format(e,this.timeFormat).toUpperCase()}isSelectedFullTimeValue(e){return!!this.date&&this.dateService.isSameHourAndMinute(e,this.date)}buildColumnOptions(){this.timeFormat=this.setupTimeFormat(),this.fullTimeOptions=this.singleColumn?this.calendarTimeModelService.getHoursRange(this.step):[],this.hoursColumnOptions=this.generateHours(),this.minutesColumnOptions=this.generateMinutesOrSeconds(),this.secondsColumnOptions=this.withSeconds?this.generateMinutesOrSeconds():[]}isFirefox(){return this.platformService.FIREFOX}generateHours(){return this.twelveHoursFormat?this.isAM?(0,C.w6)(12,e=>({value:e,text:this.calendarTimeModelService.paddToTwoSymbols(0===e?12:e)})):(0,C.eB)(12,24,e=>({value:e,text:this.calendarTimeModelService.paddToTwoSymbols(12===e?12:e-12)})):(0,C.w6)(24,e=>({value:e,text:this.calendarTimeModelService.paddToTwoSymbols(e)}))}generateMinutesOrSeconds(){return(0,C.w6)(60,e=>({value:e,text:this.calendarTimeModelService.paddToTwoSymbols(e)}))}setupTimeFormat(){return this.timeFormat?this.timeFormat:this.config.format||this.buildTimeFormat()}buildTimeFormat(){return this.twelveHoursFormat?`${this.withSeconds&&!this.singleColumn?this.dateService.getTwelveHoursFormatWithSeconds():this.dateService.getTwelveHoursFormat()}`:`${this.withSeconds&&!this.singleColumn?this.dateService.getTwentyFourHoursFormatWithSeconds():this.dateService.getTwentyFourHoursFormat()}`}initFromConfig(e){var s;this.twelveHoursFormat=e?e.twelveHoursFormat:this.dateService.getLocaleTimeFormat().includes("h");const m=Object.assign(Object.assign({},x.l),null!==(s=null==e?void 0:e.localization)&&void 0!==s?s:{});this.hoursText=m.hoursText,this.minutesText=m.minutesText,this.secondsText=m.secondsText,this.ampmText=m.ampmText}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(x.P),t.Y36(h.h),t.Y36(t.soG),t.Y36(t.sBO),t.Y36(l.g),t.Y36(c.u))},n.\u0275cmp=t.Xpm({type:n,selectors:[["nb-timepicker"]],viewQuery:function(e,s){if(1&e&&t.Gf(P.kV,7),2&e){let m;t.iGM(m=t.CRH())&&(s.portal=m.first)}},inputs:{timeFormat:"timeFormat",twelveHoursFormat:"twelveHoursFormat",withSeconds:"withSeconds",singleColumn:"singleColumn",step:"step",date:"date",showFooter:"showFooter",applyButtonText:"applyButtonText",hoursText:"hoursText",minutesText:"minutesText",secondsText:"secondsText",ampmText:"ampmText",currentTimeButtonText:"currentTimeButtonText"},outputs:{onSelectTime:"onSelectTime"},exportAs:["nbTimepicker"],features:[t.TTD],decls:1,vars:0,consts:[["class","nb-timepicker-container",3,"supports-scrollbar-theming",4,"nbPortal"],[1,"nb-timepicker-container"],[1,"column-header"],[4,"ngIf","ngIfElse"],["fullTimeHeadersBlock",""],[1,"picker-body"],["fullTimeColumnBlock",""],["class","actions-footer",4,"ngIf"],[1,"header-cell"],["class","header-cell",4,"ngIf"],[1,"values-list"],["class","list-item",3,"selected",4,"ngFor","ngForOf","ngForTrackBy"],[1,"list-item"],[3,"value","selected","select"],["class","values-list",4,"ngIf"],["class","list-item am-pm-item",3,"selected",4,"ngFor","ngForOf","ngForTrackBy"],[1,"list-item","am-pm-item"],[1,"actions-footer"],[3,"applyButtonText","currentTimeButtonText","setCurrentTime","saveValue"]],template:function(e,s){1&e&&t.YNc(0,N,10,7,"nb-card",0)},directives:[P.kV,u.As,u.nd,O.O5,f.z,O.sg,f.q,S,u.XW,I.V],styles:[".nb-timepicker-container[_ngcontent-%COMP%]{overflow:hidden;margin-bottom:0}.values-list[_ngcontent-%COMP%]{width:100%;overflow:hidden;-ms-scroll-snap-type:y proximity;scroll-snap-type:y proximity}.values-list[_ngcontent-%COMP%]:hover{overflow-y:auto}.list-item[_ngcontent-%COMP%]{border:0;padding:0;cursor:pointer}.picker-body[_ngcontent-%COMP%]{display:flex;width:100%;flex:1 0 0;overflow:hidden}.column-header[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-between;padding:0}.header-cell[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;justify-content:center}.actions-footer[_ngcontent-%COMP%]{width:100%}nb-card-header[_ngcontent-%COMP%], nb-card-footer[_ngcontent-%COMP%]{flex:0 0 auto}"],changeDetection:0}),n})()},11500:(A,b,i)=>{i.d(b,{k:()=>c});var t=i(86019),g=i(3167),v=i(62335),P=i(85082),C=i(94494),x=i(12613),h=i(3164),l=i(83668);let c=(()=>{class u{static forRoot(f={}){return{ngModule:u,providers:[{provide:h.P,useValue:f}]}}static forChild(f={}){return{ngModule:u,providers:[{provide:h.P,useValue:f}]}}}return u.\u0275fac=function(f){return new(f||u)},u.\u0275mod=l.oAB({type:u}),u.\u0275inj=l.cJS({providers:[x.g],imports:[[t.ez,g.j,v.C,P.z,C.V]]}),u})()}}]);