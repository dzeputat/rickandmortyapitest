"use strict";(self.webpackChunkmyApp=self.webpackChunkmyApp||[]).push([[845],{9845:function(e,n,r){r.r(n),r.d(n,{FacebookLoginWeb:function(){return p}});var t=r(5861),o=r(5671),s=r(3144),u=r(136),c=r(9388),i=r(7757),a=r.n(i),p=function(e){(0,u.Z)(r,e);var n=(0,c.Z)(r);function r(){return(0,o.Z)(this,r),n.call(this,{name:"FacebookLogin",platforms:["web"]})}return(0,s.Z)(r,[{key:"login",value:function(){var e=(0,t.Z)(a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("FacebookLoginWeb.login",n),e.abrupt("return",new Promise((function(e,r){FB.login((function(n){console.debug("FB.login",n),"connected"===n.status?e({accessToken:{token:n.authResponse.accessToken}}):r({accessToken:{token:null}})}),{scope:n.permissions.join(",")})})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},{key:"logout",value:function(){var e=(0,t.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e){FB.logout((function(){return e()}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getCurrentAccessToken",value:function(){var e=(0,t.Z)(a().mark((function e(){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){FB.getLoginStatus((function(r){if("connected"===r.status){var t={accessToken:{applicationId:void 0,declinedPermissions:[],expires:void 0,isExpired:void 0,lastRefresh:void 0,permissions:[],token:r.authResponse.accessToken,userId:r.authResponse.userID}};e(t)}else n({accessToken:{token:null}})}))})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getProfile",value:function(){var e=(0,t.Z)(a().mark((function e(n){var r;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.fields.join(","),e.abrupt("return",new Promise((function(e,n){FB.api("/me",{fields:r},(function(r){r.error?n(r.error.message):e(r)}))})));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()}]),r}(r(6653).Uw)}}]);
//# sourceMappingURL=845.e43edbec.chunk.js.map