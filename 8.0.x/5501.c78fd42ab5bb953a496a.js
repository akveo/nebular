(self.webpackChunknebular=self.webpackChunknebular||[]).push([[5501],{45501:function(e,n,t){"use strict";t.r(n),t.d(n,{MenuTestModule:function(){return _}});var u=t(64255),o=t(38851),i=t(94893),c=t(55074),m=t(63260),r=t(11785),s=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item1"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #1"),r.qZA())},encapsulation:2}),e}(),a=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item2"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #2"),r.qZA())},encapsulation:2}),e}(),l=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item3"]],decls:1,vars:0,template:function(e,n){1&e&&r._UZ(0,"router-outlet")},directives:[m.lC],encapsulation:2}),e}(),p=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item31"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #3.1"),r.qZA())},encapsulation:2}),e}(),f=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item32"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #3.2"),r.qZA())},encapsulation:2}),e}(),d=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item33"]],decls:1,vars:0,template:function(e,n){1&e&&r._UZ(0,"router-outlet")},directives:[m.lC],encapsulation:2}),e}(),h=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item331"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #3.3.1"),r.qZA())},encapsulation:2}),e}(),M=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item332"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #3.3.2"),r.qZA())},encapsulation:2}),e}(),b=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-item4"]],decls:2,vars:0,template:function(e,n){1&e&&(r.TgZ(0,"h1"),r._uU(1,"Menu Item #4"),r.qZA())},encapsulation:2}),e}(),g=t(25416),Z=t(55959),y=t(79598),k=t(37010),I=t(37196),v=t(59087),A=t(96843),q=[{path:"menu-test.component",component:function(){function e(e){this.menuService=e,this.sidebarMenuItems=[{title:"Menu Items",group:!0,icon:"home-outline"},{title:"Menu #1",link:"/menu/menu-test.component/1",icon:"home-outline",queryParams:{param:1},fragment:"#fragment"},{title:"Menu #2",link:"/menu/menu-test.component/2",icon:"home-outline"},{title:"Menu #3",icon:"home-outline",children:[{title:"Menu #3.1",link:"/menu/menu-test.component/3/1"},{title:"Menu #3.2",link:"/menu/menu-test.component/3/2"},{title:"Menu #3.3",children:[{title:"Menu #3.3.1",link:"/menu/menu-test.component/3/3/1"},{title:"Menu #3.3.2",link:"/menu/menu-test.component/3/3/2",queryParams:{param:2},fragment:"#fragment",home:!0},{title:"@nebular/theme",target:"_blank",url:"https://github.com/akveo/ng2-admin"}]}]}],this.firstMenuItems=[{title:"Menu Items",group:!0,icon:"home-outline"},{title:"Menu #1",link:"/menu/menu-test.component/1",icon:"home-outline",queryParams:{param:1},fragment:"#fragment"},{title:"Menu #2",link:"/menu/menu-test.component/2",icon:"home-outline"}],this.secondMenuItems=[{title:"Menu items with fragments ",group:!0},{title:"Menu #1",link:"/menu/menu-test.component/1",icon:"home-outline",pathMatch:"prefix"},{title:"Menu #12 + fragment",link:"/menu/menu-test.component/12",fragment:"fragment",icon:"home-outline"},{title:"Menu #3",link:"/menu/menu-test.component/3",icon:"home-outline"}],this.thirdMenuItems=[{title:"Menu #1"},{title:"Menu #2",children:[{title:"Menu #2.1"},{title:"Hidden Submenu Item",hidden:!0}]},{title:"Hidden Menu Item",hidden:!0}],this.destroy$=new Z.xQ}return e.prototype.ngOnInit=function(){this.menuService.onItemClick().pipe((0,g.R)(this.destroy$)).subscribe(function(e){return console.info(e)}),this.menuService.onItemSelect().pipe((0,g.R)(this.destroy$)).subscribe(function(e){return console.info(e)}),this.menuService.onSubmenuToggle().pipe((0,g.R)(this.destroy$)).subscribe(function(e){return console.info(e)}),this.menuService.addItems([{title:"Menu #3",icon:"home-outline",children:[{title:"Menu #3.1",link:"/menu/menu-test.component/3/1"},{title:"Menu #3.2",link:"/menu/menu-test.component/3/2"},{title:"Menu #3.3",children:[{title:"Menu #3.3.1",link:"/menu/menu-test.component/3/3/1"},{title:"Menu #3.3.2",link:"/menu/menu-test.component/3/3/2",queryParams:{param:2},fragment:"#fragment",home:!0},{title:"@nebular/theme",target:"_blank",url:"https://github.com/akveo/ng2-admin"}]}]}],"firstMenu")},e.prototype.ngOnDestroy=function(){this.destroy$.next(),this.destroy$.complete()},e.prototype.addMenuItem=function(){this.menuService.addItems([{title:"New Menu Item"}],"firstMenu")},e.prototype.navigateHome=function(){this.menuService.navigateHome("firstMenu")},e.\u0275fac=function(n){return new(n||e)(r.Y36(y.kk))},e.\u0275cmp=r.Xpm({type:e,selectors:[["nb-menu-test"]],decls:23,vars:5,consts:[["state","compacted"],["id","menu-sidebar","tag","sidebarMenu",3,"items"],["size","giant"],["id","menu-first","tag","firstMenu",3,"items","autoCollapse"],["nbButton","","id","addBtn",3,"click"],["nbButton","","id","homeBtn",3,"click"],["id","menu-second","tag","SecondMenu",3,"items"],["id","menu-third","tag","thirdMenu",3,"items"]],template:function(e,n){1&e&&(r.TgZ(0,"nb-layout"),r.TgZ(1,"nb-sidebar",0),r._UZ(2,"nb-menu",1),r.qZA(),r.TgZ(3,"nb-layout-column"),r.TgZ(4,"nb-card",2),r.TgZ(5,"nb-card-body"),r._UZ(6,"nb-menu",3),r._UZ(7,"router-outlet"),r.TgZ(8,"button",4),r.NdJ("click",function(){return n.addMenuItem()}),r._uU(9,"Add"),r.qZA(),r.TgZ(10,"button",5),r.NdJ("click",function(){return n.navigateHome()}),r._uU(11,"Home"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(12,"nb-card",2),r.TgZ(13,"nb-card-body"),r._UZ(14,"nb-menu",6),r._UZ(15,"router-outlet"),r.TgZ(16,"button",4),r.NdJ("click",function(){return n.addMenuItem()}),r._uU(17,"Add"),r.qZA(),r.TgZ(18,"button",5),r.NdJ("click",function(){return n.navigateHome()}),r._uU(19,"Home"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(20,"nb-card",2),r.TgZ(21,"nb-card-body"),r._UZ(22,"nb-menu",7),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&e&&(r.xp6(2),r.Q6J("items",n.sidebarMenuItems),r.xp6(4),r.Q6J("items",n.firstMenuItems)("autoCollapse",!0),r.xp6(8),r.Q6J("items",n.secondMenuItems),r.xp6(8),r.Q6J("items",n.thirdMenuItems))},directives:[k.Aq,I.nZ,v.mB,k.dP,A.As,A.yK,m.lC],encapsulation:2}),e}(),children:[{path:"",redirectTo:"1",pathMatch:"full"},{path:"1",component:s},{path:"2",component:a},{path:"12",component:s},{path:"3",component:l,children:[{path:"",redirectTo:"1",pathMatch:"full"},{path:"1",component:p},{path:"2",component:f},{path:"3",component:d,children:[{path:"",redirectTo:"1",pathMatch:"full"},{path:"1",component:h},{path:"2",component:M}]}]},{path:"4",component:b}]}],T=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[m.Bz.forChild(q)],m.Bz]}),e}(),_=function(){function e(){}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[u.j.forRoot(),o.B,i.P.forRoot(),c.z,T]]}),e}()}}]);