"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8592],{5571:(M,v,e)=>{e.d(v,{M:()=>m});var n=e(35330),t=e(87974);function m(...E){return p=>{let a;return"function"==typeof E[E.length-1]&&(a=E.pop()),p.lift(new C(E,a))}}class C{constructor(p,a){this.observables=p,this.project=a}call(p,a){return a.subscribe(new y(p,this.observables,this.project))}}class y extends n.L{constructor(p,a,_){super(p),this.observables=a,this.project=_,this.toRespond=[];const f=a.length;this.values=new Array(f);for(let o=0;o<f;o++)this.toRespond.push(o);for(let o=0;o<f;o++)this.add((0,t.D)(this,a[o],void 0,o))}notifyNext(p,a,_){this.values[_]=a;const f=this.toRespond;if(f.length>0){const o=f.indexOf(_);-1!==o&&f.splice(o,1)}}notifyComplete(){}_next(p){if(0===this.toRespond.length){const a=[p,...this.values];this.project?this._tryProject(a):this.destination.next(a)}}_tryProject(p){let a;try{a=this.project.apply(this,p)}catch(_){return void this.destination.error(_)}this.destination.next(a)}}},38051:(M,v,e)=>{e.d(v,{B:()=>P,l:()=>u});var n=e(38580),t=e(83668),m=e(86019),C=e(24301),y=e(35492),E=e(79175);function p(l,O){if(1&l&&(t.TgZ(0,"a",6),t._UZ(1,"nb-icon",7),t.GkF(2,8),t.qZA()),2&l){const d=t.oxw(2),g=t.MAs(4);t.Q6J("routerLink",d.link)("title",d.title),t.xp6(1),t.Q6J("config",d.icon),t.xp6(1),t.Q6J("ngTemplateOutlet",g)}}function a(l,O){if(1&l&&(t.TgZ(0,"a",9),t._UZ(1,"nb-icon",7),t.GkF(2,8),t.qZA()),2&l){const d=t.oxw(2),g=t.MAs(4);t.Q6J("href",d.href,t.LSH)("title",d.title),t.xp6(1),t.Q6J("config",d.icon),t.xp6(1),t.Q6J("ngTemplateOutlet",g)}}function _(l,O){if(1&l&&(t.TgZ(0,"a",10),t.NdJ("click",function(g){return g.preventDefault()}),t._UZ(1,"nb-icon",7),t.GkF(2,8),t.qZA()),2&l){const d=t.oxw(2),g=t.MAs(4);t.Q6J("title",d.title),t.xp6(1),t.Q6J("config",d.icon),t.xp6(1),t.Q6J("ngTemplateOutlet",g)}}function f(l,O){if(1&l&&(t.ynx(0),t.YNc(1,p,3,4,"a",3),t.YNc(2,a,3,4,"a",4),t.YNc(3,_,3,3,"a",5),t.BQk()),2&l){const d=t.oxw();t.xp6(1),t.Q6J("ngIf",d.link),t.xp6(1),t.Q6J("ngIf",d.href&&!d.link),t.xp6(1),t.Q6J("ngIf",!d.href&&!d.link)}}function o(l,O){if(1&l&&(t.Hsn(0),t.GkF(1,8)),2&l){t.oxw();const d=t.MAs(4);t.xp6(1),t.Q6J("ngTemplateOutlet",d)}}function s(l,O){if(1&l&&t._UZ(0,"nb-badge",12),2&l){const d=t.oxw(2);t.Q6J("text",d.badgeText)("dotMode",d.badgeDot)("status",d.badgeStatus)("position",d.badgePosition)}}function i(l,O){if(1&l&&t.YNc(0,s,1,4,"nb-badge",11),2&l){const d=t.oxw();t.Q6J("ngIf",d.badgeText||d.badgeDot)}}const h=["*"],c=[[["nb-action"]]],r=["nb-action"];let P=(()=>{class l{constructor(){this.title="",this._disabled=!1,this.badgeStatus="basic"}get disabled(){return this._disabled}set disabled(d){this._disabled=(0,n.e)(d)}get badgeDot(){return this._badgeDot}set badgeDot(d){this._badgeDot=(0,n.e)(d)}}return l.\u0275fac=function(d){return new(d||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["nb-action"]],hostVars:2,hostBindings:function(d,g){2&d&&t.ekj("disabled",g.disabled)},inputs:{link:"link",href:"href",title:"title",icon:"icon",disabled:"disabled",badgeDot:"badgeDot",badgeText:"badgeText",badgeStatus:"badgeStatus",badgePosition:"badgePosition"},ngContentSelectors:h,decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["projectedContent",""],["badgeTemplate",""],["class","icon-container",3,"routerLink","title",4,"ngIf"],["class","icon-container",3,"href","title",4,"ngIf"],["class","icon-container","href","#",3,"title","click",4,"ngIf"],[1,"icon-container",3,"routerLink","title"],[3,"config"],[3,"ngTemplateOutlet"],[1,"icon-container",3,"href","title"],["href","#",1,"icon-container",3,"title","click"],[3,"text","dotMode","status","position",4,"ngIf"],[3,"text","dotMode","status","position"]],template:function(d,g){if(1&d&&(t.F$t(),t.YNc(0,f,4,3,"ng-container",0),t.YNc(1,o,2,1,"ng-template",null,1,t.W1O),t.YNc(3,i,1,1,"ng-template",null,2,t.W1O)),2&d){const b=t.MAs(2);t.Q6J("ngIf",g.icon)("ngIfElse",b)}},directives:[m.O5,C.yS,y.f,m.tP,E.n],styles:["[_nghost-%COMP%]{background:transparent;display:flex;align-items:center;position:relative}.disabled[_nghost-%COMP%]{cursor:not-allowed}.disabled[_nghost-%COMP%]   a[_ngcontent-%COMP%], .disabled[_nghost-%COMP%]   nb-icon[_ngcontent-%COMP%]{cursor:not-allowed}nb-actions.full-width[_nghost-%COMP%], nb-actions.full-width   [_nghost-%COMP%]{justify-content:center;width:100%}a.icon-container[_ngcontent-%COMP%]{position:relative}a.icon-container[_ngcontent-%COMP%]:hover, a.icon-container[_ngcontent-%COMP%]:focus{text-decoration:none}nb-icon[_ngcontent-%COMP%]:hover{cursor:pointer}"]}),l})(),u=(()=>{class l{constructor(){this._size="small",this._fullWidth=!1}get size(){return this._size}set size(d){this._size=d}get fullWidth(){return this._fullWidth}set fullWidth(d){this._fullWidth=(0,n.e)(d)}get tiny(){return"tiny"===this.size}get small(){return"small"===this.size}get medium(){return"medium"===this.size}get large(){return"large"===this.size}get giant(){return"giant"===this.size}}return l.\u0275fac=function(d){return new(d||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["nb-actions"]],hostVars:12,hostBindings:function(d,g){2&d&&t.ekj("full-width",g.fullWidth)("size-tiny",g.tiny)("size-small",g.small)("size-medium",g.medium)("size-large",g.large)("size-giant",g.giant)},inputs:{size:"size",fullWidth:"fullWidth"},ngContentSelectors:r,decls:1,vars:0,template:function(d,g){1&d&&(t.F$t(c),t.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;align-items:center}"]}),l})()},82858:(M,v,e)=>{e.d(v,{M:()=>p});var n=e(35861),m=(e(38051),e(59888)),C=e(43004),y=e(83668);let p=(()=>{class a{}return a.\u0275fac=function(f){return new(f||a)},a.\u0275mod=y.oAB({type:a}),a.\u0275inj=y.cJS({imports:[[n.P,m.j,C.K]]}),a})()},91866:(M,v,e)=>{e.d(v,{X:()=>s});var n=e(83668),t=e(23405),m=e(28805),C=e(83944),y=e(38112),E=e(10267),p=e(86019);function a(i,h){if(1&i&&(n.TgZ(0,"nb-option-list",1),n.Hsn(1),n.qZA()),2&i){const c=n.oxw();n.Udp("width",c.optionsWidth,"px"),n.ekj("empty",!(null!=c.options&&c.options.length)),n.Q6J("size",c.size)("position",c.overlayPosition)("id",c.id)("ngClass",c.optionsListClass)}}const _=[[["nb-option"],["nb-option-group"]]],f=["nb-option, nb-option-group"];let o=0,s=(()=>{class i{constructor(c){this.cd=c,this.destroy$=new t.xQ,this.id="nb-autocomplete-"+o++,this._overlayPosition="",this.size="medium",this.activeFirst=!1,this.selectedChange=new n.vpe}get overlayPosition(){return this._overlayPosition}set overlayPosition(c){this._overlayPosition=c,this.cd.detectChanges()}get hostWidth(){return this.hostRef.nativeElement.getBoundingClientRect().width}get optionsWidth(){var c;return null!==(c=this._optionsWidth)&&void 0!==c?c:this.hostWidth}set optionsWidth(c){this._optionsWidth=c}ngAfterContentInit(){this.options.changes.pipe((0,m.R)(this.destroy$)).subscribe(()=>this.cd.detectChanges())}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}setHost(c){this.hostRef=c}emitSelected(c){this.selectedChange.emit(c)}get tiny(){return"tiny"===this.size}get small(){return"small"===this.size}get medium(){return"medium"===this.size}get large(){return"large"===this.size}get giant(){return"giant"===this.size}}return i.\u0275fac=function(c){return new(c||i)(n.Y36(n.sBO))},i.\u0275cmp=n.Xpm({type:i,selectors:[["nb-autocomplete"]],contentQueries:function(c,r,P){if(1&c&&n.Suo(P,C.q,5),2&c){let u;n.iGM(u=n.CRH())&&(r.options=u)}},viewQuery:function(c,r){if(1&c&&n.Gf(y.kV,5),2&c){let P;n.iGM(P=n.CRH())&&(r.portal=P.first)}},hostVars:10,hostBindings:function(c,r){2&c&&n.ekj("size-tiny",r.tiny)("size-small",r.small)("size-medium",r.medium)("size-large",r.large)("size-giant",r.giant)},inputs:{handleDisplayFn:"handleDisplayFn",size:"size",activeFirst:"activeFirst",optionsListClass:"optionsListClass",optionsPanelClass:"optionsPanelClass",optionsWidth:"optionsWidth"},outputs:{selectedChange:"selectedChange"},ngContentSelectors:f,decls:1,vars:0,consts:[["role","listbox",3,"size","position","width","id","empty","ngClass",4,"nbPortal"],["role","listbox",3,"size","position","id","ngClass"]],template:function(c,r){1&c&&(n.F$t(_),n.YNc(0,a,2,8,"nb-option-list",0))},directives:[y.kV,E.H,p.mk],styles:["[_nghost-%COMP%]:hover{cursor:pointer}nb-option-list.empty[_ngcontent-%COMP%]{border:none}"],changeDetection:0}),i})()},79015:(M,v,e)=>{e.d(v,{w:()=>c});var n=e(83668),t=e(49133),m=e(23405),C=e(78526),y=e(75722),E=e(41125),p=e(79204),a=e(28805),_=e(18735),f=e(31819),o=e(51628),s=e(39545),i=e(4666),h=e(55727);let c=(()=>{class r{constructor(u,l,O,d,g,b,D){this.hostRef=u,this.overlay=l,this.cd=O,this.triggerStrategyBuilder=d,this.positionBuilder=g,this.activeDescendantKeyManagerFactory=b,this.renderer=D,this.destroy$=new m.xQ,this._onChange=()=>{},this._onTouched=()=>{},this.overlayOffset=8,this.scrollStrategy="block",this.role="combobox",this.ariaAutocomplete="list",this.hasPopup="true"}get isOpen(){return this.overlayRef&&this.overlayRef.hasAttached()}get isClosed(){return!this.isOpen}get autocomplete(){return this._autocomplete}set autocomplete(u){this._autocomplete=u}get top(){return this.isOpen&&this.autocomplete.options.length&&this.autocomplete.overlayPosition===s.MG.TOP}get bottom(){return this.isOpen&&this.autocomplete.options.length&&this.autocomplete.overlayPosition===s.MG.BOTTOM}get ariaExpanded(){return this.isOpen&&this.isOpen.toString()}get ariaOwns(){return this.isOpen?this.autocomplete.id:null}get ariaActiveDescendant(){return this.isOpen&&this.keyManager.activeItem?this.keyManager.activeItem.id:null}ngAfterViewInit(){this.triggerStrategy=this.createTriggerStrategy(),this.subscribeOnTriggers()}ngOnDestroy(){this.triggerStrategy&&this.triggerStrategy.destroy(),this.positionStrategy&&this.positionStrategy.dispose(),this.overlayRef&&this.overlayRef.dispose(),this.destroy$.next(),this.destroy$.complete()}handleInput(){const u=this.hostRef.nativeElement.value;this._onChange(u),this.setHostInputValue(this.getDisplayValue(u)),this.show()}handleKeydown(){this.show()}handleBlur(){this._onTouched()}show(){this.shouldShow()&&(this.attachToOverlay(),this.setActiveItem())}hide(){this.isOpen&&(this.overlayRef.detach(),this.cd.markForCheck())}writeValue(u){this.handleInputValueUpdate(u)}registerOnChange(u){this._onChange=u}registerOnTouched(u){this._onTouched=u}setDisabledState(u){this.renderer.setProperty(this.hostRef.nativeElement,"disabled",u)}subscribeOnOptionClick(){this.autocomplete.options.changes.pipe((0,y.b)(()=>this.setActiveItem()),(0,E.O)(this.autocomplete.options),(0,p.w)(u=>(0,C.T)(...u.map(l=>l.click))),(0,a.R)(this.destroy$)).subscribe(u=>this.handleInputValueUpdate(u.value,!0))}subscribeOnPositionChange(){this.positionStrategy.positionChange.pipe((0,a.R)(this.destroy$)).subscribe(u=>{this.autocomplete.overlayPosition=u,this.cd.detectChanges()})}getActiveItem(){return this.keyManager.activeItem}setupAutocomplete(){this.autocomplete.setHost(this.customOverlayHost||this.hostRef)}getDisplayValue(u){const l=this.autocomplete.handleDisplayFn;return l?l(u):u}getContainer(){return this.overlayRef&&this.isOpen&&{location:{nativeElement:this.overlayRef.overlayElement}}}handleInputValueUpdate(u,l=!1){this.setHostInputValue(null!=u?u:""),this._onChange(u),l&&this.hostRef.nativeElement.focus(),this.autocomplete.emitSelected(u),this.hide()}subscribeOnTriggers(){this.triggerStrategy.show$.pipe((0,_.h)(()=>this.isClosed)).subscribe(()=>this.show()),this.triggerStrategy.hide$.pipe((0,_.h)(()=>this.isOpen)).subscribe(()=>this.hide())}createTriggerStrategy(){return this.triggerStrategyBuilder.trigger(f.qk.FOCUS).host(this.hostRef.nativeElement).container(()=>this.getContainer()).build()}createKeyManager(){this.keyManager=this.activeDescendantKeyManagerFactory.create(this.autocomplete.options)}setHostInputValue(u){this.hostRef.nativeElement.value=this.getDisplayValue(u)}createPositionStrategy(){return this.positionBuilder.connectedTo(this.customOverlayHost||this.hostRef).position(s.MG.BOTTOM).offset(this.overlayOffset).adjustment(s.SH.VERTICAL)}subscribeOnOverlayKeys(){this.overlayRef.keydownEvents().pipe((0,a.R)(this.destroy$)).subscribe(u=>{if(u.keyCode===o.hY&&this.isOpen)u.preventDefault(),this.hostRef.nativeElement.focus(),this.hide();else if(u.keyCode===o.K5){u.preventDefault();const l=this.getActiveItem();if(!l)return;this.handleInputValueUpdate(l.value,!0)}else this.keyManager.onKeydown(u)})}setActiveItem(){this.keyManager.setActiveItem(this.autocomplete.activeFirst?i.UL.FIRST_ACTIVE:i.UL.RESET_ACTIVE),this.cd.detectChanges()}attachToOverlay(){this.overlayRef||(this.setupAutocomplete(),this.initOverlay()),this.overlayRef.attach(this.autocomplete.portal)}createOverlay(){const u=this.createScrollStrategy();this.overlayRef=this.overlay.create({positionStrategy:this.positionStrategy,scrollStrategy:u,panelClass:this.autocomplete.optionsPanelClass})}initOverlay(){this.positionStrategy=this.createPositionStrategy(),this.createKeyManager(),this.subscribeOnPositionChange(),this.subscribeOnOptionClick(),this.checkOverlayVisibility(),this.createOverlay(),this.subscribeOnOverlayKeys()}checkOverlayVisibility(){this.autocomplete.options.changes.pipe((0,a.R)(this.destroy$)).subscribe(()=>{this.autocomplete.options.length||this.hide()})}createScrollStrategy(){return this.overlay.scrollStrategies[this.scrollStrategy]()}shouldShow(){return this.isClosed&&this.autocomplete.options.length>0}}return r.\u0275fac=function(u){return new(u||r)(n.Y36(n.SBq),n.Y36(h.Pn),n.Y36(n.sBO),n.Y36(f.o8),n.Y36(s.yp),n.Y36(i.ev),n.Y36(n.Qsj))},r.\u0275dir=n.lG2({type:r,selectors:[["input","nbAutocomplete",""]],hostVars:10,hostBindings:function(u,l){1&u&&n.NdJ("input",function(){return l.handleInput()})("keydown.arrowDown",function(){return l.handleKeydown()})("keydown.arrowUp",function(){return l.handleKeydown()})("blur",function(){return l.handleBlur()}),2&u&&(n.uIk("role",l.role)("aria-autocomplete",l.ariaAutocomplete)("haspopup",l.hasPopup)("aria-expanded",l.ariaExpanded)("aria-owns",l.ariaOwns)("aria-activedescendant",l.ariaActiveDescendant),n.ekj("nb-autocomplete-position-top",l.top)("nb-autocomplete-position-bottom",l.bottom))},inputs:{autocomplete:["nbAutocomplete","autocomplete"],overlayOffset:"overlayOffset",scrollStrategy:"scrollStrategy",customOverlayHost:"customOverlayHost"},features:[n._Bn([{provide:t.JU,useExisting:(0,n.Gpc)(()=>r),multi:!0}])]}),r})()},16651:(M,v,e)=>{e.d(v,{C:()=>f});var n=e(3167),t=e(85082),y=(e(91866),e(79015),e(49133)),E=e(86019),p=e(62817),a=e(83668);let f=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=a.oAB({type:o}),o.\u0275inj=a.cJS({imports:[[E.ez,y.u5,n.j,t.z,p.x],p.x]}),o})()},42677:(M,v,e)=>{e.d(v,{J:()=>f});var n=e(83668),t=e(23405),m=e(75488),C=e(28805),y=e(31819),E=e(39545),p=e(43),a=e(51091);class _ extends n.WD2{constructor(s,i,h=!1){super(s,i,h)}isChanged(){return this.currentValue!==this.previousValue}}let f=(()=>{class o{constructor(i,h,c,r){this.positionBuilder=i,this.triggerStrategyBuilder=h,this.dynamicOverlayService=c,this.directionService=r,this._context={},this._trigger=y.qk.NOOP,this._disabled=!1,this._position=E.MG.TOP,this._adjustment=E.SH.NOOP,this._offset=15,this._overlayConfig={},this.changes={},this.destroy$=new t.xQ}host(i){return this.changes.host=new _(this._host,i),this._host=i,this}trigger(i){return this.changes.trigger=new _(this._trigger,i),this._trigger=i,this}disabled(i){return this.changes.disabled=new _(this._disabled,i),this._disabled=i,this}position(i){return this.changes.position=new _(this._position,i),this._position=i,this}adjustment(i){return this.changes.adjustment=new _(this._adjustment,i),this._adjustment=i,this}componentType(i){return this.changes.componentType=new _(this._componentType,i),this._componentType=i,this}content(i){return this.changes.content=new _(this._content,i),this._content=i,this}context(i){return this.changes.context=new _(this._context,i),this._context=i,this}offset(i){return this.changes.offset=new _(this._offset,i),this._offset=i,this}overlayConfig(i){return this.changes.overlayConfig=new _(this._overlayConfig,i),this._overlayConfig=i,this}build(){if(!this._componentType||!this._host)throw Error("NbDynamicOverlayHandler: at least 'componentType' and 'host' should be\n      passed before building a dynamic overlay.");return this.dynamicOverlay=this.dynamicOverlayService.create(this._componentType,this._content,this._context,this.createPositionStrategy(),this._overlayConfig,this._disabled),this.connect(),this.clearChanges(),this.dynamicOverlay}rebuild(){if(this.dynamicOverlay)return this.isPositionStrategyUpdateRequired()&&this.dynamicOverlay.setPositionStrategy(this.createPositionStrategy()),this.isTriggerStrategyUpdateRequired()&&this.connect(),this.isContainerRerenderRequired()&&this.dynamicOverlay.setContentAndContext(this._content,this._context),this.isComponentTypeUpdateRequired()&&this.dynamicOverlay.setComponent(this._componentType),this.isOverlayConfigUpdateRequired()&&this.dynamicOverlay.setOverlayConfig(this._overlayConfig),this.isDisabledUpdated()&&this.dynamicOverlay.setDisabled(this._disabled),this.clearChanges(),this.dynamicOverlay}connect(){if(!this.dynamicOverlay)throw new Error("NbDynamicOverlayHandler: cannot connect to DynamicOverlay\n      as it is not created yet. Call build() first");this.disconnect(),this.subscribeOnTriggers(this.dynamicOverlay),this.subscribeOnDirectionChange()}disconnect(){this.triggerStrategy&&this.triggerStrategy.destroy()}destroy(){this.destroy$.next(),this.destroy$.complete(),this.disconnect(),this.clearChanges(),this.dynamicOverlay&&this.dynamicOverlay.dispose()}createPositionStrategy(){return this.positionBuilder.connectedTo(this._host).position(this._position).adjustment(this._adjustment).offset(this._offset).direction(this.directionService.getDirection())}subscribeOnTriggers(i){this.triggerStrategy=this.triggerStrategyBuilder.trigger(this._trigger).host(this._host.nativeElement).container(()=>i.getContainer()).build(),this.triggerStrategy.show$.subscribe(()=>i.show()),this.triggerStrategy.hide$.subscribe(()=>i.hide())}subscribeOnDirectionChange(){this.directionService.onDirectionChange().pipe((0,m.T)(1),(0,C.R)(this.destroy$)).subscribe(()=>{this.dynamicOverlay.setPositionStrategy(this.createPositionStrategy())})}isContainerRerenderRequired(){return this.isContentUpdated()||this.isContextUpdated()||this.isPositionStrategyUpdateRequired()}isPositionStrategyUpdateRequired(){return this.isAdjustmentUpdated()||this.isPositionUpdated()||this.isOffsetUpdated()||this.isHostUpdated()}isTriggerStrategyUpdateRequired(){return this.isTriggerUpdated()||this.isHostUpdated()}isComponentTypeUpdateRequired(){return this.isComponentTypeUpdated()}isOverlayConfigUpdateRequired(){return this.isOverlayConfigUpdated()}isComponentTypeUpdated(){return this.changes.componentType&&this.changes.componentType.isChanged()}isContentUpdated(){return this.changes.content&&this.changes.content.isChanged()}isContextUpdated(){return this.changes.context&&this.changes.context.isChanged()}isAdjustmentUpdated(){return this.changes.adjustment&&this.changes.adjustment.isChanged()}isPositionUpdated(){return this.changes.position&&this.changes.position.isChanged()}isHostUpdated(){return this.changes.host&&this.changes.host.isChanged()}isTriggerUpdated(){return this.changes.trigger&&this.changes.trigger.isChanged()}isOffsetUpdated(){return this.changes.offset&&this.changes.offset.isChanged()}isOverlayConfigUpdated(){return this.changes.overlayConfig&&this.changes.overlayConfig.isChanged()}isDisabledUpdated(){return this.changes.disabled&&this.changes.disabled.isChanged()}clearChanges(){this.changes={}}}return o.\u0275fac=function(i){return new(i||o)(n.LFG(E.yp),n.LFG(y.o8),n.LFG(p.X),n.LFG(a.nX))},o.\u0275prov=n.Yz7({token:o,factory:o.\u0275fac}),o})()},43:(M,v,e)=>{e.d(v,{X:()=>f});var n=e(25389),t=e(18735),m=e(28805),C=e(23405),y=e(34099),E=e(78526),p=e(55727),a=e(83668),_=e(38112);let f=(()=>{class o{constructor(i,h,c,r){this.overlay=i,this.componentFactoryResolver=h,this.zone=c,this.overlayContainer=r,this.context={},this.overlayConfig={},this.disabled=!1,this.positionStrategyChange$=new C.xQ,this.isShown$=new y.X(!1),this.destroy$=new C.xQ,this.overlayDestroy$=new C.xQ}get isAttached(){return this.ref&&this.ref.hasAttached()}get isShown(){return this.isShown$.pipe((0,n.x)())}create(i,h,c,r,P={},u=!1){return this.setContentAndContext(h,c),this.setComponent(i),this.setPositionStrategy(r),this.setOverlayConfig(P),this.setDisabled(u),this}setContent(i){this.content=i,this.container&&this.updateContext(),this.updatePosition()}setContext(i){this.context=i,this.container&&this.updateContext(),this.updatePosition()}setContentAndContext(i,h){this.content=i,this.context=h,this.container&&this.updateContext(),this.updatePosition()}setComponent(i){this.componentType=i;const h=this.isAttached;this.disposeOverlayRef(),h&&this.show()}setPositionStrategy(i){this.positionStrategyChange$.next(),this.positionStrategy=i,this.positionStrategy.positionChange.pipe((0,t.h)(()=>!!this.container),(0,m.R)((0,E.T)(this.positionStrategyChange$,this.destroy$))).subscribe(h=>{this.lastAppliedPosition=h,(0,p.r$)(this.container,{position:h})}),this.ref&&this.ref.updatePositionStrategy(this.positionStrategy)}setOverlayConfig(i){this.overlayConfig=i;const h=this.isAttached;this.disposeOverlayRef(),h&&this.show()}setDisabled(i){i&&this.isShown$.value&&this.hide(),this.disabled=i}show(){if(!this.disabled){if(this.ref||this.createOverlay(),this.renderContainer(),!this.hasOverlayInContainer())return this.disposeOverlayRef(),this.show();this.isShown$.next(!0)}}hide(){!this.ref||(this.ref.detach(),this.container=null,this.isShown$.next(!1))}toggle(){this.isAttached?this.hide():this.show()}dispose(){this.destroy$.next(),this.destroy$.complete(),this.hide(),this.disposeOverlayRef(),this.isShown$.complete(),this.positionStrategyChange$.complete(),this.overlayDestroy$.complete()}getContainer(){return this.container}createOverlay(){this.ref=this.overlay.create(Object.assign({positionStrategy:this.positionStrategy,scrollStrategy:this.overlay.scrollStrategies.reposition()},this.overlayConfig)),this.updatePositionWhenStable(this.ref)}renderContainer(){const i=this.createContainerContext();this.container||(this.container=(0,p.fH)(this.ref,this.componentType,i,this.componentFactoryResolver)),this.container.instance.renderContent()}updateContext(){const i=this.createContainerContext();Object.assign(this.container.instance,i),this.container.instance.renderContent(),this.container.changeDetectorRef.detectChanges()}createContainerContext(){return{content:this.content,context:this.context,cfr:this.componentFactoryResolver,position:this.lastAppliedPosition}}updatePositionWhenStable(i){const h=this.overlayDestroy$.pipe((0,t.h)(c=>c===i));this.zone.onStable.pipe((0,m.R)((0,E.T)(this.destroy$,h))).subscribe(()=>this.updatePosition())}updatePosition(){this.ref&&this.ref.updatePosition()}hasOverlayInContainer(){return this.overlayContainer.getContainerElement().contains(this.ref.hostElement)}disposeOverlayRef(){this.ref&&(this.ref.dispose(),this.overlayDestroy$.next(this.ref),this.ref=null,this.container=null)}}return o.\u0275fac=function(i){return new(i||o)(a.LFG(p.Pn),a.LFG(a._Vd),a.LFG(a.R0b),a.LFG(_.y_))},o.\u0275prov=a.Yz7({token:o,factory:o.\u0275fac}),o})()},13262:(M,v,e)=>{e.d(v,{T:()=>p,C:()=>a});var n=e(83668),t=e(39545),m=e(38112),C=e(86019);function y(_,f){if(1&_&&(n.TgZ(0,"div",2),n._uU(1),n.qZA()),2&_){const o=n.oxw();n.xp6(1),n.Oqu(o.content)}}function E(_,f){}let p=(()=>{class _{get top(){return this.position===t.MG.TOP}get topStart(){return this.position===t.MG.TOP_START}get topEnd(){return this.position===t.MG.TOP_END}get right(){return this.position===t.MG.RIGHT||this.position===t.MG.END}get endTop(){return this.position===t.MG.END_TOP}get endBottom(){return this.position===t.MG.END_BOTTOM}get bottom(){return this.position===t.MG.BOTTOM}get bottomStart(){return this.position===t.MG.BOTTOM_START}get bottomEnd(){return this.position===t.MG.BOTTOM_END}get left(){return this.position===t.MG.LEFT||this.position===t.MG.START}get startTop(){return this.position===t.MG.START_TOP}get startBottom(){return this.position===t.MG.START_BOTTOM}}return _.\u0275fac=function(o){return new(o||_)},_.\u0275cmp=n.Xpm({type:_,selectors:[["ng-component"]],hostVars:24,hostBindings:function(o,s){2&o&&n.ekj("nb-overlay-top",s.top)("nb-overlay-top-start",s.topStart)("nb-overlay-top-end",s.topEnd)("nb-overlay-right",s.right)("nb-overlay-end-top",s.endTop)("nb-overlay-end-bottom",s.endBottom)("nb-overlay-bottom",s.bottom)("nb-overlay-bottom-start",s.bottomStart)("nb-overlay-bottom-end",s.bottomEnd)("nb-overlay-left",s.left)("nb-overlay-start-top",s.startTop)("nb-overlay-start-bottom",s.startBottom)},inputs:{position:"position"},decls:0,vars:0,template:function(o,s){},encapsulation:2}),_})(),a=(()=>{class _{constructor(o,s,i){this.vcr=o,this.injector=s,this.changeDetectorRef=i,this.isAttached=!1}get isStringContent(){return!!this.content}attachComponentPortal(o,s){o.injector=this.createChildInjector(o.componentFactoryResolver);const i=this.portalOutlet.attachComponentPortal(o);return s&&Object.assign(i.instance,s),i.changeDetectorRef.markForCheck(),i.changeDetectorRef.detectChanges(),this.isAttached=!0,i}attachTemplatePortal(o){const s=this.portalOutlet.attachTemplatePortal(o);return s.detectChanges(),this.isAttached=!0,s}attachStringContent(o){this.content=o,this.changeDetectorRef.markForCheck(),this.changeDetectorRef.detectChanges(),this.isAttached=!0}detach(){this.portalOutlet.hasAttached()&&this.portalOutlet.detach(),this.attachStringContent(null),this.isAttached=!1}createChildInjector(o){return new m.F$(this.injector,new WeakMap([[n._Vd,o]]))}}return _.\u0275fac=function(o){return new(o||_)(n.Y36(n.s_b),n.Y36(n.zs3),n.Y36(n.sBO))},_.\u0275cmp=n.Xpm({type:_,selectors:[["nb-overlay-container"]],viewQuery:function(o,s){if(1&o&&n.Gf(m.GF,7),2&o){let i;n.iGM(i=n.CRH())&&(s.portalOutlet=i.first)}},decls:2,vars:1,consts:[["class","primitive-overlay",4,"ngIf"],["nbPortalOutlet",""],[1,"primitive-overlay"]],template:function(o,s){1&o&&(n.YNc(0,y,2,1,"div",0),n.YNc(1,E,0,0,"ng-template",1)),2&o&&n.Q6J("ngIf",s.isStringContent)},directives:[C.O5,m.GF],encapsulation:2}),_})()},56259:(M,v,e)=>{e.d(v,{j:()=>l});var n=e(23405),t=e(10466),m=e(32668),C=e(78526),y=e(38053),E=e(25389),p=e(75722),a=e(28805),_=e(28554),f=e(68088),o=e(65964),s=e(83668),i=e(86019);function h(O,d){if(1&O&&(s.TgZ(0,"div",2),s.ALo(1,"async"),s.Hsn(2,1),s.qZA()),2&O){const g=s.oxw();s.Q6J("ngClass",s.lcZ(1,1,g.prefixClasses$))}}function c(O,d){if(1&O&&(s.TgZ(0,"div",2),s.ALo(1,"async"),s.Hsn(2,2),s.qZA()),2&O){const g=s.oxw();s.Q6J("ngClass",s.lcZ(1,1,g.suffixClasses$))}}const r=["*",[["","nbPrefix",""]],[["","nbSuffix",""]]],P=["*","[nbPrefix]","[nbSuffix]"];let l=(()=>{class O{constructor(g,b,D,T){this.cd=g,this.zone=b,this.elementRef=D,this.renderer=T,this.destroy$=new n.xQ,this.formControlState$=new t.t(1),this.prefixClasses$=this.formControlState$.pipe((0,y.U)(A=>this.getAddonClasses("prefix",A))),this.suffixClasses$=this.formControlState$.pipe((0,y.U)(A=>this.getAddonClasses("suffix",A)))}ngAfterContentChecked(){this.formControl||function(){throw new Error("NbFormFieldComponent must contain [nbInput]")}()}ngAfterContentInit(){this.subscribeToFormControlStateChange(),this.subscribeToAddonChange()}ngAfterViewInit(){this.zone.runOutsideAngular(()=>setTimeout(()=>{this.renderer.addClass(this.elementRef.nativeElement,"nb-transition")}))}ngOnDestroy(){this.destroy$.next()}shouldShowPrefix(){return this.getFormControlConfig().supportsPrefix&&!!this.prefix.length}shouldShowSuffix(){return this.getFormControlConfig().supportsSuffix&&!!this.suffix.length}subscribeToFormControlStateChange(){const{disabled$:g,focused$:b,size$:D,status$:T,fullWidth$:A}=this.formControl;(0,m.aj)([g,b,D,T,A]).pipe((0,y.U)(([R,x,U,I,S])=>({disabled:R,focused:x,size:U,status:I,fullWidth:S})),(0,E.x)((R,x)=>this.isStatesEqual(R,x)),(0,p.b)(({size:R,fullWidth:x})=>{const U=[`nb-form-field-size-${R}`];x||U.push("nb-form-field-limited-width"),this.formFieldClasses=U.join(" ")}),(0,a.R)(this.destroy$)).subscribe(this.formControlState$)}subscribeToAddonChange(){(0,C.T)(this.prefix.changes,this.suffix.changes).pipe((0,a.R)(this.destroy$)).subscribe(()=>this.cd.markForCheck())}getAddonClasses(g,b){const D=["nb-form-field-addon",`nb-form-field-${g}-${b.size}`];return D.push(b.disabled?"nb-form-field-addon-disabled":b.focused?`nb-form-field-addon-${b.status}-highlight`:`nb-form-field-addon-${b.status}`),D}getFormControlConfig(){return this.formControlConfig||new o.G}isStatesEqual(g,b){return g.status===b.status&&g.disabled===b.disabled&&g.focused===b.focused&&g.fullWidth===b.fullWidth&&g.size===b.size}}return O.\u0275fac=function(g){return new(g||O)(s.Y36(s.sBO),s.Y36(s.R0b),s.Y36(s.SBq),s.Y36(s.Qsj))},O.\u0275cmp=s.Xpm({type:O,selectors:[["nb-form-field"]],contentQueries:function(g,b,D){if(1&g&&(s.Suo(D,o.d,5),s.Suo(D,o.G,5),s.Suo(D,_.t,5),s.Suo(D,f.y,5)),2&g){let T;s.iGM(T=s.CRH())&&(b.formControl=T.first),s.iGM(T=s.CRH())&&(b.formControlConfig=T.first),s.iGM(T=s.CRH())&&(b.prefix=T),s.iGM(T=s.CRH())&&(b.suffix=T)}},hostVars:2,hostBindings:function(g,b){2&g&&s.Tol(b.formFieldClasses)},ngContentSelectors:P,decls:4,vars:6,consts:[[3,"ngClass",4,"ngIf"],[1,"nb-form-control-container"],[3,"ngClass"]],template:function(g,b){1&g&&(s.F$t(r),s.YNc(0,h,3,3,"div",0),s.TgZ(1,"div",1),s.Hsn(2),s.qZA(),s.YNc(3,c,3,3,"div",0)),2&g&&(s.Q6J("ngIf",b.shouldShowPrefix()),s.xp6(1),s.ekj("nb-form-field-control-with-prefix",b.shouldShowPrefix())("nb-form-field-control-with-suffix",b.shouldShowSuffix()),s.xp6(2),s.Q6J("ngIf",b.shouldShowSuffix()))},directives:[i.O5,i.mk],pipes:[i.Ov],styles:["[_nghost-%COMP%]{display:flex;align-items:center}.nb-form-control-container[_ngcontent-%COMP%]{width:100%}"],changeDetection:0}),O})()},77158:(M,v,e)=>{e.d(v,{V:()=>p});var n=e(86019),y=(e(56259),e(28554),e(68088),e(83668));let p=(()=>{class a{}return a.\u0275fac=function(f){return new(f||a)},a.\u0275mod=y.oAB({type:a}),a.\u0275inj=y.cJS({imports:[[n.ez]]}),a})()},28554:(M,v,e)=>{e.d(v,{t:()=>t});var n=e(83668);let t=(()=>{class m{}return m.\u0275fac=function(y){return new(y||m)},m.\u0275dir=n.lG2({type:m,selectors:[["","nbPrefix",""]]}),m})()},68088:(M,v,e)=>{e.d(v,{y:()=>t});var n=e(83668);let t=(()=>{class m{}return m.\u0275fac=function(y){return new(y||m)},m.\u0275dir=n.lG2({type:m,selectors:[["","nbSuffix",""]]}),m})()},66773:(M,v,e)=>{e.d(v,{k:()=>i});var n=e(38580),t=e(83668),m=e(35427),C=e(86019),y=e(79175);function E(h,c){if(1&h&&t._UZ(0,"nb-badge",8),2&h){const r=t.oxw(2);t.Q6J("text",r.badgeText)("status",r.badgeStatus)("position",r.badgePosition)}}function p(h,c){if(1&h&&(t.TgZ(0,"div",6),t.YNc(1,E,1,3,"nb-badge",7),t.qZA()),2&h){const r=t.oxw();t.Udp("background-image",r.imageBackgroundStyle),t.xp6(1),t.Q6J("ngIf",r.badgeText)}}function a(h,c){if(1&h&&(t.ynx(0),t._uU(1),t.BQk()),2&h){const r=t.oxw(2);t.xp6(1),t.hij(" ",r.getInitials()," ")}}function _(h,c){if(1&h&&t._UZ(0,"nb-badge",8),2&h){const r=t.oxw(2);t.Q6J("text",r.badgeText)("status",r.badgeStatus)("position",r.badgePosition)}}function f(h,c){if(1&h&&(t.TgZ(0,"div",9),t.YNc(1,a,2,1,"ng-container",10),t.YNc(2,_,1,3,"nb-badge",7),t.qZA()),2&h){const r=t.oxw();t.Udp("background-color",r.color),t.xp6(1),t.Q6J("ngIf",r.showInitials),t.xp6(1),t.Q6J("ngIf",r.badgeText)}}function o(h,c){if(1&h&&(t.TgZ(0,"div",11),t._uU(1),t.qZA()),2&h){const r=t.oxw();t.xp6(1),t.Oqu(r.name)}}function s(h,c){if(1&h&&(t.TgZ(0,"div",12),t._uU(1),t.qZA()),2&h){const r=t.oxw();t.xp6(1),t.Oqu(r.title)}}let i=(()=>{class h{constructor(r){this.domSanitizer=r,this.name="Anonymous",this.size="medium",this.shape="round",this._showName=!0,this._showTitle=!0,this._showInitials=!0,this.badgeStatus="basic"}set picture(r){this.imageBackgroundStyle=r?this.domSanitizer.bypassSecurityTrustStyle(`url(${r})`):null}get showName(){return this._showName}set showName(r){this._showName=(0,n.e)(r)}get showTitle(){return this._showTitle}set showTitle(r){this._showTitle=(0,n.e)(r)}get showInitials(){return this._showInitials}set showInitials(r){this._showInitials=(0,n.e)(r)}get onlyPicture(){return!this.showName&&!this.showTitle}set onlyPicture(r){this.showName=this.showTitle=!(0,n.e)(r)}get tiny(){return"tiny"===this.size}get small(){return"small"===this.size}get medium(){return"medium"===this.size}get large(){return"large"===this.size}get giant(){return"giant"===this.size}get rectangle(){return"rectangle"===this.shape}get semiRound(){return"semi-round"===this.shape}get round(){return"round"===this.shape}getInitials(){return this.name?this.name.split(" ").map(P=>P.charAt(0)).splice(0,2).join("").toUpperCase():""}}return h.\u0275fac=function(r){return new(r||h)(t.Y36(m.H7))},h.\u0275cmp=t.Xpm({type:h,selectors:[["nb-user"]],hostVars:16,hostBindings:function(r,P){2&r&&t.ekj("size-tiny",P.tiny)("size-small",P.small)("size-medium",P.medium)("size-large",P.large)("size-giant",P.giant)("shape-rectangle",P.rectangle)("shape-semi-round",P.semiRound)("shape-round",P.round)},inputs:{name:"name",title:"title",picture:"picture",color:"color",size:"size",shape:"shape",showName:"showName",showTitle:"showTitle",showInitials:"showInitials",onlyPicture:"onlyPicture",badgeText:"badgeText",badgeStatus:"badgeStatus",badgePosition:"badgePosition"},decls:6,vars:4,consts:[[1,"user-container"],["class","user-picture image",3,"background-image",4,"ngIf"],["class","user-picture initials",3,"background-color",4,"ngIf"],[1,"info-container"],["class","user-name",4,"ngIf"],["class","user-title",4,"ngIf"],[1,"user-picture","image"],[3,"text","status","position",4,"ngIf"],[3,"text","status","position"],[1,"user-picture","initials"],[4,"ngIf"],[1,"user-name"],[1,"user-title"]],template:function(r,P){1&r&&(t.TgZ(0,"div",0),t.YNc(1,p,2,3,"div",1),t.YNc(2,f,3,4,"div",2),t.TgZ(3,"div",3),t.YNc(4,o,2,1,"div",4),t.YNc(5,s,2,1,"div",5),t.qZA(),t.qZA()),2&r&&(t.xp6(1),t.Q6J("ngIf",P.imageBackgroundStyle),t.xp6(1),t.Q6J("ngIf",!P.imageBackgroundStyle),t.xp6(2),t.Q6J("ngIf",P.showName&&P.name),t.xp6(1),t.Q6J("ngIf",P.showTitle&&P.title))},directives:[C.O5,y.n],styles:["[_nghost-%COMP%]{display:flex}[_nghost-%COMP%]   .user-container[_ngcontent-%COMP%]{position:relative;display:flex;align-items:center}[_nghost-%COMP%]   .user-picture[_ngcontent-%COMP%]{position:relative;flex-shrink:0}[_nghost-%COMP%]   .user-picture.image[_ngcontent-%COMP%]{background-size:cover;background-repeat:no-repeat}[_nghost-%COMP%]   .user-picture.initials[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}[dir=rtl]   [_nghost-%COMP%]   .user-name[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .user-title[_ngcontent-%COMP%]{text-align:right}[dir=ltr]   [_nghost-%COMP%]   .info-container[_ngcontent-%COMP%]{margin-left:.5rem}[dir=rtl]   [_nghost-%COMP%]   .info-container[_ngcontent-%COMP%]{margin-right:.5rem}"]}),h})()},78082:(M,v,e)=>{e.d(v,{A:()=>E});var n=e(35861),m=(e(66773),e(59888)),C=e(83668);let E=(()=>{class p{}return p.\u0275fac=function(_){return new(_||p)},p.\u0275mod=C.oAB({type:p}),p.\u0275inj=C.cJS({imports:[[n.P,m.j]]}),p})()},72540:(M,v,e)=>{e.d(v,{D:()=>n});const n=["Lemons","Raspberries","Strawberries","Blackberries","Kiwis","Grapefruit","Avocado","Watermelon","Cantaloupe","Oranges","Peaches"]}}]);