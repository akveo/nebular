"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1600],{84842:(v,f,s)=>{s.d(f,{x:()=>n});var a=s(83668);const M=["*"];let n=(()=>{class _{}return _.\u0275fac=function(u){return new(u||_)},_.\u0275cmp=a.Xpm({type:_,selectors:[["nb-auth-block"]],ngContentSelectors:M,decls:1,vars:0,template:function(u,c){1&u&&(a.F$t(),a.Hsn(0))},styles:["[_nghost-%COMP%]{display:block;width:100%;max-width:35rem}[_nghost-%COMP%]     form{width:100%}[_nghost-%COMP%]     .label{display:block;margin-bottom:.5rem}[_nghost-%COMP%]     .forgot-password{text-decoration:none;margin-bottom:.5rem}[_nghost-%COMP%]     .caption{margin-top:.5rem}[_nghost-%COMP%]     .alert{text-align:center}[_nghost-%COMP%]     .title{margin-top:0;margin-bottom:.75rem;text-align:center}[_nghost-%COMP%]     .sub-title{margin-bottom:2rem;text-align:center}[_nghost-%COMP%]     .form-control-group{margin-bottom:2rem}[_nghost-%COMP%]     .form-control-group.accept-group{display:flex;justify-content:space-between;margin:2rem 0}[_nghost-%COMP%]     .label-with-link{display:flex;justify-content:space-between}[_nghost-%COMP%]     .links{text-align:center;margin-top:1.75rem}[_nghost-%COMP%]     .links .socials{margin-top:1.5rem}[_nghost-%COMP%]     .links .socials a{margin:0 1rem;text-decoration:none;vertical-align:middle}[_nghost-%COMP%]     .links .socials a.with-icon{font-size:2rem}[_nghost-%COMP%]     .another-action{margin-top:2rem;text-align:center}[_nghost-%COMP%]     .sign-in-or-up{margin-top:2rem;display:flex;justify-content:space-between}[_nghost-%COMP%]     nb-alert .alert-title, [_nghost-%COMP%]     nb-alert .alert-message{margin:0 0 .5rem}[_nghost-%COMP%]     nb-alert .alert-message-list{list-style-type:none;padding:0;margin:0}"]}),_})()},79074:(v,f,s)=>{s.d(f,{A:()=>i});var a=s(28805),M=s(23405),n=s(83668),_=s(83785),m=s(86019),u=s(90761),c=s(60634),p=s(35492),d=s(84842),l=s(24301);let i=(()=>{class h{constructor(b,P){this.auth=b,this.location=P,this.destroy$=new M.xQ,this.authenticated=!1,this.token="",this.subscription=b.onAuthenticationChange().pipe((0,a.R)(this.destroy$)).subscribe(A=>{this.authenticated=A})}back(){return this.location.back(),!1}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}}return h.\u0275fac=function(b){return new(b||h)(n.Y36(_._),n.Y36(m.Ye))},h.\u0275cmp=n.Xpm({type:h,selectors:[["nb-auth"]],decls:10,vars:0,consts:[[1,"navigation"],["href","#","aria-label","Back",1,"link","back-link",3,"click"],["icon","arrow-back"]],template:function(b,P){1&b&&(n.TgZ(0,"nb-layout"),n.TgZ(1,"nb-layout-column"),n.TgZ(2,"nb-card"),n.TgZ(3,"nb-card-header"),n.TgZ(4,"nav",0),n.TgZ(5,"a",1),n.NdJ("click",function(){return P.back()}),n._UZ(6,"nb-icon",2),n.qZA(),n.qZA(),n.qZA(),n.TgZ(7,"nb-card-body"),n.TgZ(8,"nb-auth-block"),n._UZ(9,"router-outlet"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA())},directives:[u.Aq,u.dP,c.As,c.nd,p.f,c.yK,d.x,l.lC],styles:[".visually-hidden[_ngcontent-%COMP%]{position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px)}.cdk-overlay-container[_ngcontent-%COMP%], .cdk-global-overlay-wrapper[_ngcontent-%COMP%]{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container[_ngcontent-%COMP%]{position:fixed;z-index:1000}.cdk-overlay-container[_ngcontent-%COMP%]:empty{display:none}.cdk-global-overlay-wrapper[_ngcontent-%COMP%]{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane[_ngcontent-%COMP%]{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:flex;max-width:100%;max-height:100%}.cdk-overlay-backdrop[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;-webkit-tap-highlight-color:transparent;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing[_ngcontent-%COMP%]{opacity:1}.cdk-high-contrast-active[_ngcontent-%COMP%]   .cdk-overlay-backdrop.cdk-overlay-backdrop-showing[_ngcontent-%COMP%]{opacity:.6}.cdk-overlay-dark-backdrop[_ngcontent-%COMP%]{background:rgba(0,0,0,.32)}.cdk-overlay-transparent-backdrop[_ngcontent-%COMP%], .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing[_ngcontent-%COMP%]{opacity:0}.cdk-overlay-connected-position-bounding-box[_ngcontent-%COMP%]{position:absolute;z-index:1000;display:flex;flex-direction:column;min-width:1px;min-height:1px}.cdk-global-scrollblock[_ngcontent-%COMP%]{position:fixed;width:100%;overflow-y:scroll}.nb-global-scrollblock[_ngcontent-%COMP%]{position:static;width:auto;overflow:hidden}html[_ngcontent-%COMP%]{box-sizing:border-box}*[_ngcontent-%COMP%], *[_ngcontent-%COMP%]:before, *[_ngcontent-%COMP%]:after{box-sizing:inherit}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{margin:0;padding:0}html[_ngcontent-%COMP%]{line-height:1.15;-webkit-text-size-adjust:100%}body[_ngcontent-%COMP%]{margin:0}h1[_ngcontent-%COMP%]{font-size:2em;margin:.67em 0}hr[_ngcontent-%COMP%]{box-sizing:content-box;height:0;overflow:visible}pre[_ngcontent-%COMP%]{font-family:monospace,monospace;font-size:1em}a[_ngcontent-%COMP%]{background-color:transparent}abbr[title][_ngcontent-%COMP%]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b[_ngcontent-%COMP%], strong[_ngcontent-%COMP%]{font-weight:bolder}code[_ngcontent-%COMP%], kbd[_ngcontent-%COMP%], samp[_ngcontent-%COMP%]{font-family:monospace,monospace;font-size:1em}small[_ngcontent-%COMP%]{font-size:80%}sub[_ngcontent-%COMP%], sup[_ngcontent-%COMP%]{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub[_ngcontent-%COMP%]{bottom:-.25em}sup[_ngcontent-%COMP%]{top:-.5em}img[_ngcontent-%COMP%]{border-style:none}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%], optgroup[_ngcontent-%COMP%], select[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%]{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button[_ngcontent-%COMP%], input[_ngcontent-%COMP%]{overflow:visible}button[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-transform:none}button[_ngcontent-%COMP%], [type=button][_ngcontent-%COMP%], [type=reset][_ngcontent-%COMP%], [type=submit][_ngcontent-%COMP%]{-webkit-appearance:button}button[_ngcontent-%COMP%]::-moz-focus-inner, [type=button][_ngcontent-%COMP%]::-moz-focus-inner, [type=reset][_ngcontent-%COMP%]::-moz-focus-inner, [type=submit][_ngcontent-%COMP%]::-moz-focus-inner{border-style:none;padding:0}button[_ngcontent-%COMP%]:-moz-focusring, [type=button][_ngcontent-%COMP%]:-moz-focusring, [type=reset][_ngcontent-%COMP%]:-moz-focusring, [type=submit][_ngcontent-%COMP%]:-moz-focusring{outline:1px dotted ButtonText}fieldset[_ngcontent-%COMP%]{padding:.35em .75em .625em}legend[_ngcontent-%COMP%]{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress[_ngcontent-%COMP%]{vertical-align:baseline}textarea[_ngcontent-%COMP%]{overflow:auto}[type=checkbox][_ngcontent-%COMP%], [type=radio][_ngcontent-%COMP%]{box-sizing:border-box;padding:0}[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button, [type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button{height:auto}[type=search][_ngcontent-%COMP%]{-webkit-appearance:textfield;outline-offset:-2px}[type=search][_ngcontent-%COMP%]::-webkit-search-decoration{-webkit-appearance:none}[_ngcontent-%COMP%]::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details[_ngcontent-%COMP%]{display:block}summary[_ngcontent-%COMP%]{display:list-item}template[_ngcontent-%COMP%]{display:none}[hidden][_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]   nb-card[_ngcontent-%COMP%]{margin:0;height:calc(100vh - 5rem)}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]{display:inline-block;text-decoration:none}[_nghost-%COMP%]   .navigation[_ngcontent-%COMP%]   .link[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%]{font-size:2rem;vertical-align:middle}[_nghost-%COMP%]   .links[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%]{font-size:2.5rem}[_nghost-%COMP%]   nb-card-body[_ngcontent-%COMP%]{display:flex;width:100%}[_nghost-%COMP%]   nb-auth-block[_ngcontent-%COMP%]{margin:auto}@media (max-width: 767.98px){[_nghost-%COMP%]   nb-card[_ngcontent-%COMP%]{border-radius:0;height:100vh}}[_nghost-%COMP%]     nb-layout .layout .layout-container .content .columns nb-layout-column{padding:2.5rem}@media (max-width: 767.98px){[_nghost-%COMP%]     nb-layout .layout .layout-container .content .columns nb-layout-column{padding:0}}"]}),h})()},13861:(v,f,s)=>{s.d(f,{Y:()=>R});var a=s(48299),M=s(95170),n=s(83668),_=s(83785),m=s(24301),u=s(86019),c=s(49133),p=s(83191),d=s(2563),l=s(6424),i=s(78739),h=s(35492);function y(t,r){if(1&t&&(n.TgZ(0,"li",26),n._uU(1),n.qZA()),2&t){const e=r.$implicit;n.xp6(1),n.Oqu(e)}}function b(t,r){if(1&t&&(n.TgZ(0,"nb-alert",22),n.TgZ(1,"p",23),n.TgZ(2,"b"),n._uU(3,"Oh snap!"),n.qZA(),n.qZA(),n.TgZ(4,"ul",24),n.YNc(5,y,2,1,"li",25),n.qZA(),n.qZA()),2&t){const e=n.oxw();n.xp6(5),n.Q6J("ngForOf",e.errors)}}function P(t,r){if(1&t&&(n.TgZ(0,"li",26),n._uU(1),n.qZA()),2&t){const e=r.$implicit;n.xp6(1),n.Oqu(e)}}function A(t,r){if(1&t&&(n.TgZ(0,"nb-alert",27),n.TgZ(1,"p",23),n.TgZ(2,"b"),n._uU(3,"Hooray!"),n.qZA(),n.qZA(),n.TgZ(4,"ul",24),n.YNc(5,P,2,1,"li",25),n.qZA(),n.qZA()),2&t){const e=n.oxw();n.xp6(5),n.Q6J("ngForOf",e.messages)}}function k(t,r){1&t&&(n.TgZ(0,"p",29),n._uU(1," Email is required! "),n.qZA())}function x(t,r){1&t&&(n.TgZ(0,"p",29),n._uU(1," Email should be the real one! "),n.qZA())}function T(t,r){if(1&t&&(n.ynx(0),n.YNc(1,k,2,0,"p",28),n.YNc(2,x,2,0,"p",28),n.BQk()),2&t){n.oxw();const e=n.MAs(12);n.xp6(1),n.Q6J("ngIf",null==e.errors?null:e.errors.required),n.xp6(1),n.Q6J("ngIf",null==e.errors?null:e.errors.pattern)}}function E(t,r){1&t&&(n.TgZ(0,"p",29),n._uU(1," Password is required! "),n.qZA())}function Z(t,r){if(1&t&&(n.TgZ(0,"p",29),n._uU(1),n.qZA()),2&t){const e=n.oxw(2);n.xp6(1),n.AsE(" Password should contain from ",e.getConfigValue("forms.validation.password.minLength")," to ",e.getConfigValue("forms.validation.password.maxLength")," characters ")}}function w(t,r){if(1&t&&(n.ynx(0),n.YNc(1,E,2,0,"p",28),n.YNc(2,Z,2,2,"p",28),n.BQk()),2&t){n.oxw();const e=n.MAs(21);n.xp6(1),n.Q6J("ngIf",null==e.errors?null:e.errors.required),n.xp6(1),n.Q6J("ngIf",(null==e.errors?null:e.errors.minlength)||(null==e.errors?null:e.errors.maxlength))}}function L(t,r){if(1&t){const e=n.EpF();n.TgZ(0,"nb-checkbox",30),n.NdJ("ngModelChange",function(C){return n.CHM(e),n.oxw().user.rememberMe=C}),n._uU(1,"Remember me"),n.qZA()}if(2&t){const e=n.oxw();n.Q6J("ngModel",e.user.rememberMe)}}function N(t,r){if(1&t&&n._UZ(0,"nb-icon",39),2&t){const e=n.oxw(2).$implicit;n.Q6J("icon",e.icon)}}function D(t,r){if(1&t&&n._uU(0),2&t){const e=n.oxw(2).$implicit;n.Oqu(e.title)}}function I(t,r){if(1&t&&(n.TgZ(0,"a",36),n.YNc(1,N,1,1,"nb-icon",37),n.YNc(2,D,1,1,"ng-template",null,38,n.W1O),n.qZA()),2&t){const e=n.MAs(3),o=n.oxw().$implicit;n.ekj("with-icon",o.icon),n.Q6J("routerLink",o.link),n.uIk("target",o.target)("class",o.icon),n.xp6(1),n.Q6J("ngIf",o.icon)("ngIfElse",e)}}function U(t,r){if(1&t&&n._UZ(0,"nb-icon",39),2&t){const e=n.oxw(2).$implicit;n.Q6J("icon",e.icon)}}function z(t,r){if(1&t&&n._uU(0),2&t){const e=n.oxw(2).$implicit;n.Oqu(e.title)}}function B(t,r){if(1&t&&(n.TgZ(0,"a"),n.YNc(1,U,1,1,"nb-icon",37),n.YNc(2,z,1,1,"ng-template",null,38,n.W1O),n.qZA()),2&t){const e=n.MAs(3),o=n.oxw().$implicit;n.ekj("with-icon",o.icon),n.uIk("href",o.url,n.LSH)("target",o.target)("class",o.icon),n.xp6(1),n.Q6J("ngIf",o.icon)("ngIfElse",e)}}function J(t,r){if(1&t&&(n.ynx(0),n.YNc(1,I,4,7,"a",34),n.YNc(2,B,4,7,"a",35),n.BQk()),2&t){const e=r.$implicit;n.xp6(1),n.Q6J("ngIf",e.link),n.xp6(1),n.Q6J("ngIf",e.url)}}function q(t,r){if(1&t&&(n.TgZ(0,"section",31),n._uU(1," or enter with: "),n.TgZ(2,"div",32),n.YNc(3,J,3,2,"ng-container",33),n.qZA(),n.qZA()),2&t){const e=n.oxw();n.xp6(3),n.Q6J("ngForOf",e.socialLinks)}}let R=(()=>{class t{constructor(e,o={},C,g){this.service=e,this.options=o,this.cd=C,this.router=g,this.redirectDelay=0,this.showMessages={},this.strategy="",this.errors=[],this.messages=[],this.user={},this.submitted=!1,this.socialLinks=[],this.rememberMe=!1,this.redirectDelay=this.getConfigValue("forms.login.redirectDelay"),this.showMessages=this.getConfigValue("forms.login.showMessages"),this.strategy=this.getConfigValue("forms.login.strategy"),this.socialLinks=this.getConfigValue("forms.login.socialLinks"),this.rememberMe=this.getConfigValue("forms.login.rememberMe")}login(){this.errors=[],this.messages=[],this.submitted=!0,this.service.authenticate(this.strategy,this.user).subscribe(e=>{this.submitted=!1,e.isSuccess()?this.messages=e.getMessages():this.errors=e.getErrors();const o=e.getRedirect();o&&setTimeout(()=>this.router.navigateByUrl(o),this.redirectDelay),this.cd.detectChanges()})}getConfigValue(e){return(0,M.hB)(this.options,e,null)}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(_._),n.Y36(a.h),n.Y36(n.sBO),n.Y36(m.F0))},t.\u0275cmp=n.Xpm({type:t,selectors:[["nb-login"]],decls:32,vars:19,consts:[["id","title",1,"title"],[1,"sub-title"],["outline","danger","role","alert",4,"ngIf"],["outline","success","role","alert",4,"ngIf"],["aria-labelledby","title",3,"ngSubmit"],["form","ngForm"],[1,"form-control-group"],["for","input-email",1,"label"],["nbInput","","fullWidth","","name","email","id","input-email","pattern",".+@.+\\..+","placeholder","Email address","fieldSize","large","autofocus","",3,"ngModel","status","required","ngModelChange"],["email","ngModel"],[4,"ngIf"],[1,"label-with-link"],["for","input-password",1,"label"],["routerLink","../request-password",1,"forgot-password","caption-2"],["nbInput","","fullWidth","","name","password","type","password","id","input-password","placeholder","Password","fieldSize","large",3,"ngModel","status","required","minlength","maxlength","ngModelChange"],["password","ngModel"],[1,"form-control-group","accept-group"],["name","rememberMe",3,"ngModel","ngModelChange",4,"ngIf"],["nbButton","","fullWidth","","status","primary","size","large",3,"disabled"],["class","links","aria-label","Social sign in",4,"ngIf"],["aria-label","Register",1,"another-action"],["routerLink","../register",1,"text-link"],["outline","danger","role","alert"],[1,"alert-title"],[1,"alert-message-list"],["class","alert-message",4,"ngFor","ngForOf"],[1,"alert-message"],["outline","success","role","alert"],["class","caption status-danger",4,"ngIf"],[1,"caption","status-danger"],["name","rememberMe",3,"ngModel","ngModelChange"],["aria-label","Social sign in",1,"links"],[1,"socials"],[4,"ngFor","ngForOf"],[3,"routerLink","with-icon",4,"ngIf"],[3,"with-icon",4,"ngIf"],[3,"routerLink"],[3,"icon",4,"ngIf","ngIfElse"],["title",""],[3,"icon"]],template:function(e,o){if(1&e&&(n.TgZ(0,"h1",0),n._uU(1,"Login"),n.qZA(),n.TgZ(2,"p",1),n._uU(3,"Hello! Log in with your email."),n.qZA(),n.YNc(4,b,6,1,"nb-alert",2),n.YNc(5,A,6,1,"nb-alert",3),n.TgZ(6,"form",4,5),n.NdJ("ngSubmit",function(){return o.login()}),n.TgZ(8,"div",6),n.TgZ(9,"label",7),n._uU(10,"Email address:"),n.qZA(),n.TgZ(11,"input",8,9),n.NdJ("ngModelChange",function(g){return o.user.email=g}),n.qZA(),n.YNc(13,T,3,2,"ng-container",10),n.qZA(),n.TgZ(14,"div",6),n.TgZ(15,"span",11),n.TgZ(16,"label",12),n._uU(17,"Password:"),n.qZA(),n.TgZ(18,"a",13),n._uU(19,"Forgot Password?"),n.qZA(),n.qZA(),n.TgZ(20,"input",14,15),n.NdJ("ngModelChange",function(g){return o.user.password=g}),n.qZA(),n.YNc(22,w,3,2,"ng-container",10),n.qZA(),n.TgZ(23,"div",16),n.YNc(24,L,2,1,"nb-checkbox",17),n.qZA(),n.TgZ(25,"button",18),n._uU(26," Log In "),n.qZA(),n.qZA(),n.YNc(27,q,4,1,"section",19),n.TgZ(28,"section",20),n._uU(29," Don't have an account? "),n.TgZ(30,"a",21),n._uU(31,"Register"),n.qZA(),n.qZA()),2&e){const C=n.MAs(7),g=n.MAs(12),O=n.MAs(21);n.xp6(4),n.Q6J("ngIf",o.showMessages.error&&(null==o.errors?null:o.errors.length)&&!o.submitted),n.xp6(1),n.Q6J("ngIf",o.showMessages.success&&(null==o.messages?null:o.messages.length)&&!o.submitted),n.xp6(6),n.Q6J("ngModel",o.user.email)("status",g.dirty?g.invalid?"danger":"success":"basic")("required",o.getConfigValue("forms.validation.email.required")),n.uIk("aria-invalid",!(!g.invalid||!g.touched)||null),n.xp6(2),n.Q6J("ngIf",g.invalid&&g.touched),n.xp6(7),n.Q6J("ngModel",o.user.password)("status",O.dirty?O.invalid?"danger":"success":"basic")("required",o.getConfigValue("forms.validation.password.required"))("minlength",o.getConfigValue("forms.validation.password.minLength"))("maxlength",o.getConfigValue("forms.validation.password.maxLength")),n.uIk("aria-invalid",!(!O.invalid||!O.touched)||null),n.xp6(2),n.Q6J("ngIf",O.invalid&&O.touched),n.xp6(2),n.Q6J("ngIf",o.rememberMe),n.xp6(1),n.ekj("btn-pulse",o.submitted),n.Q6J("disabled",o.submitted||!C.valid),n.xp6(2),n.Q6J("ngIf",o.socialLinks&&o.socialLinks.length>0)}},directives:[u.O5,c._Y,c.JL,c.F,p.h,c.Fj,c.c5,c.JJ,c.On,c.Q7,m.yS,c.wO,c.nD,d.D,l.$,u.sg,i.N,h.f],encapsulation:2,changeDetection:0}),t})()},6424:(v,f,s)=>{s.d(f,{$:()=>c});var a=s(83668),M=s(38580),n=s(40163),_=s(86019);function m(p,d){if(1&p){const l=a.EpF();a.TgZ(0,"button",1),a.NdJ("click",function(){return a.CHM(l),a.oxw().onClose()}),a.TgZ(1,"span",2),a._uU(2,"\xd7"),a.qZA(),a.qZA()}}const u=["*"];let c=(()=>{class p{constructor(l){this.statusService=l,this.size="",this.status="basic",this.accent="",this.outline="",this._closable=!1,this.close=new a.vpe}get closable(){return this._closable}set closable(l){this._closable=(0,M.e)(l)}onClose(){this.close.emit()}get tiny(){return"tiny"===this.size}get small(){return"small"===this.size}get medium(){return"medium"===this.size}get large(){return"large"===this.size}get giant(){return"giant"===this.size}get primary(){return"primary"===this.status}get success(){return"success"===this.status}get info(){return"info"===this.status}get warning(){return"warning"===this.status}get danger(){return"danger"===this.status}get basic(){return"basic"===this.status}get control(){return"control"===this.status}get primaryAccent(){return"primary"===this.accent}get successAccent(){return"success"===this.accent}get infoAccent(){return"info"===this.accent}get warningAccent(){return"warning"===this.accent}get dangerAccent(){return"danger"===this.accent}get basicAccent(){return"basic"===this.accent}get controlAccent(){return"control"===this.accent}get primaryOutline(){return"primary"===this.outline}get successOutline(){return"success"===this.outline}get infoOutline(){return"info"===this.outline}get warningOutline(){return"warning"===this.outline}get dangerOutline(){return"danger"===this.outline}get basicOutline(){return"basic"===this.outline}get controlOutline(){return"control"===this.outline}get additionalClasses(){return this.statusService.isCustomStatus(this.status)?[this.statusService.getStatusClass(this.status)]:[]}}return p.\u0275fac=function(l){return new(l||p)(a.Y36(n.Y))},p.\u0275cmp=a.Xpm({type:p,selectors:[["nb-alert"]],hostVars:56,hostBindings:function(l,i){2&l&&(a.Tol(i.additionalClasses),a.ekj("closable",i.closable)("size-tiny",i.tiny)("size-small",i.small)("size-medium",i.medium)("size-large",i.large)("size-giant",i.giant)("status-primary",i.primary)("status-success",i.success)("status-info",i.info)("status-warning",i.warning)("status-danger",i.danger)("status-basic",i.basic)("status-control",i.control)("accent-primary",i.primaryAccent)("accent-success",i.successAccent)("accent-info",i.infoAccent)("accent-warning",i.warningAccent)("accent-danger",i.dangerAccent)("accent-basic",i.basicAccent)("accent-control",i.controlAccent)("outline-primary",i.primaryOutline)("outline-success",i.successOutline)("outline-info",i.infoOutline)("outline-warning",i.warningOutline)("outline-danger",i.dangerOutline)("outline-basic",i.basicOutline)("outline-control",i.controlOutline))},inputs:{size:"size",status:"status",accent:"accent",outline:"outline",closable:"closable"},outputs:{close:"close"},ngContentSelectors:u,decls:2,vars:1,consts:[["type","button","class","close","aria-label","Close",3,"click",4,"ngIf"],["type","button","aria-label","Close",1,"close",3,"click"],["aria-hidden","true"]],template:function(l,i){1&l&&(a.F$t(),a.YNc(0,m,3,0,"button",0),a.Hsn(1)),2&l&&a.Q6J("ngIf",i.closable)},directives:[_.O5],styles:["[_nghost-%COMP%]{display:flex;flex-direction:column;position:relative}[dir=ltr]   [_nghost-%COMP%]   .close[_ngcontent-%COMP%]{right:0}[dir=rtl]   [_nghost-%COMP%]   .close[_ngcontent-%COMP%]{left:0}.close[_ngcontent-%COMP%]{position:absolute;top:0;color:inherit;background-color:transparent;border:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}"]}),p})()}}]);