(this.webpackJsonpfebryardiansyah=this.webpackJsonpfebryardiansyah||[]).push([[0],{102:function(e,s,a){},103:function(e,s,a){"use strict";a.r(s);var c=a(1),t=a.n(c),n=a(17),i=a.n(n),l=(a(36),a(37),a(6)),r=a(2),d=(a(38),a(7)),j=a(0);function o(){return Object(j.jsx)("div",{className:"container d-flex flex-column justify-content-center align-items-center mt-5",style:{height:"calc(100vh - 110px)"},children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"col-md-8",children:[Object(j.jsx)("h1",{style:{animation:d.animations.fadeInUp},children:"hello, i\u2019m"}),Object(j.jsx)("div",{style:{color:"#EB5757",fontSize:"80px",fontWeight:"bold",animation:d.animations.fadeInUp},children:"Febry Ardiansyah"}),Object(j.jsx)("h4",{style:{animation:d.animations.fadeInUp},children:"Software engineering student at Institute Teknologi Telkom Purwokerto that currently learning Flutter, NodeJs, and ReactJS."}),Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"social-icon text-center mt-5 mb-3",style:{animation:d.animations.slideIn},children:[Object(j.jsx)("a",{href:"https://github.com/febryardiansyah",className:"link-secondary",children:Object(j.jsx)("i",{className:"fab fa-github me-2",children:" "})}),Object(j.jsx)("a",{href:"https://instagram.com/febry_ardiansyah24",className:"link-secondary",children:Object(j.jsx)("i",{className:"fab fa-instagram me-2"})}),Object(j.jsx)("a",{href:"mailto:febryardiansyah27@gmail.com",className:"link-secondary",children:Object(j.jsx)("i",{className:"far fa-envelope me-2"})}),Object(j.jsx)("a",{href:"https://twitter.com/febryar69",className:"link-secondary",children:Object(j.jsx)("i",{className:"fab fa-twitter me-2"})}),Object(j.jsx)("a",{href:"https://www.linkedin.com/in/febry-ardiansyah-a4b580170/",className:"link-secondary",children:Object(j.jsx)("i",{className:"fab fa-linkedin"})})]})})]}),Object(j.jsx)("div",{className:"col-md-4 d-flex justify-content-center",children:Object(j.jsx)("img",{src:"/assets/me.jpeg",alt:"",className:"rounded-circle",style:{width:"370px",height:"370px",objectFit:"cover",animation:d.animations.bounceIn}})})]})})}function b(){return Object(j.jsx)("div",{className:"container",children:Object(j.jsxs)("div",{className:"mt-3",children:[Object(j.jsx)("h1",{children:Object(j.jsx)("b",{children:"About me"})}),Object(j.jsxs)("div",{className:"desc",style:{animation:d.animations.fadeIn},children:[Object(j.jsx)("p",{className:"mt-5",children:"Hi, iam Febry Ardiansyah \u270b"}),Object(j.jsx)("p",{children:"Software engineering student at Institute Teknologi Telkom Purwokerto that currently learning Flutter, NodeJs, and ReactJS.I have a lot of experience building an Android and IOS app using Flutter SDK. I've finished a lots of project related to Flutter, i also familiar using nodejs, reactJs, mongoDB, and Firebase"})]}),Object(j.jsxs)("div",{className:"skills mt-5",style:{animation:d.animations.fadeInUp},children:[Object(j.jsx)("h2",{children:"Programming Skills"}),"Flutter",Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-10",children:Object(j.jsx)("div",{class:"progress",children:Object(j.jsx)("div",{class:"progress-bar bg-info",role:"progressbar",style:{width:"90%"},"aria-valuenow":"90","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(j.jsx)("div",{className:"col-md-2 font-monospace",children:"90%"})]}),"NodeJs",Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-10",children:Object(j.jsx)("div",{class:"progress",children:Object(j.jsx)("div",{class:"progress-bar",role:"progressbar",style:{width:"70%"},"aria-valuenow":"70","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(j.jsx)("div",{className:"col-md-2 font-monospace",children:"70%"})]}),"ReactJs",Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-10",children:Object(j.jsx)("div",{class:"progress",children:Object(j.jsx)("div",{class:"progress-bar bg-warning",role:"progressbar",style:{width:"60%"},"aria-valuenow":"60","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(j.jsx)("div",{className:"col-md-2 font-monospace",children:"60%"})]}),"MongoDB",Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-10",children:Object(j.jsx)("div",{class:"progress",children:Object(j.jsx)("div",{class:"progress-bar bg-danger",role:"progressbar",style:{width:"40%"},"aria-valuenow":"40","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(j.jsx)("div",{className:"col-md-2 font-monospace",children:"40%"})]})]})]})})}var m=a(5),h=a(12),x=a.n(h),O=a(30),v=a.n(O)()({projectId:"wdc0uzak",dataset:"production"});function u(){var e=Object(c.useState)([]),s=Object(m.a)(e,2),a=s[0],t=s[1],n=Object(c.useState)(!1),i=Object(m.a)(n,2),r=i[0],d=i[1];Object(c.useEffect)((function(){d(!0),v.fetch("*[_type == \"post\"]{\n            _id,\n            title,\n            slug,\n            body,\n            publishedAt,\n            \"categories\":categories[]{\n                _type == 'reference' => @->,\n                _type != 'reference' => @,\n            },\n            mainImage{\n                asset->{\n                    _id,\n                    url\n                },\n                alt\n            }\n        }").then((function(e){d(!1),t(e)})).catch((function(e){return console.log(e.responseBody)}))}),[]),console.log(a);return r?Object(j.jsx)("div",{className:"container",children:"Loading.."}):Object(j.jsx)("div",{className:"container mt-5",children:Object(j.jsx)(x.a,{children:Object(j.jsx)("div",{className:"row",children:a&&a.map((function(e){return Object(j.jsx)("div",{className:"col-md-6 mb-3",children:Object(j.jsx)(l.b,{to:"/post/".concat(e.slug.current),className:"link",style:{color:"black",textDecoration:"none"},children:Object(j.jsxs)("div",{class:"card",children:[Object(j.jsxs)("div",{class:"card-body",children:[Object(j.jsx)("h4",{class:"card-title",children:Object(j.jsx)("b",{children:e.title})}),e.categories&&e.categories.map((function(e){return Object(j.jsx)("div",{className:"badge bg-secondary me-1",children:e.title})})),Object(j.jsx)("p",{class:"card-text",children:e.body[0].children[0].text})]}),Object(j.jsx)("div",{class:"card-footer text-muted font-monospace",children:new Date(e.publishedAt).toLocaleDateString()})]})},e.slug.current)})}))})})})}var g=a(31),p=a.n(g);a(102);function f(){return Object(j.jsx)("div",{className:"container mt-5",children:Object(j.jsx)(x.a,{children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-6",children:Object(j.jsx)("a",{href:"",children:Object(j.jsx)("div",{class:"card",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-4",children:Object(j.jsx)("img",{src:"https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png",class:"card-img-top",alt:"..."})}),Object(j.jsx)("div",{className:"col-md-8",children:Object(j.jsxs)("div",{class:"card-body",children:[Object(j.jsx)("h5",{class:"card-title",children:Object(j.jsx)("b",{children:"Card title"})}),Object(j.jsx)("p",{class:"card-text",children:"Nimeflix is an mobile application for streamin and download Anime subtitle Bahasa Indonesia"}),Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("div",{className:"card d-inline p-2 me-2",children:"Flutter"}),Object(j.jsx)("div",{className:"card d-inline p-2",children:"Flutter"})]})]})})]})})})}),Object(j.jsx)("div",{className:"col-md-6",children:Object(j.jsx)("a",{href:"",children:Object(j.jsx)("div",{class:"card",children:Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-md-4",children:Object(j.jsx)("img",{src:"https://storage.googleapis.com/cms-storage-bucket/70760bf1e88b184bb1bc.png",class:"card-img-top",alt:"..."})}),Object(j.jsx)("div",{className:"col-md-8",children:Object(j.jsxs)("div",{class:"card-body",children:[Object(j.jsx)("h5",{class:"card-title",children:Object(j.jsx)("b",{children:"Card title"})}),Object(j.jsx)("p",{class:"card-text",children:"Nimeflix is an mobile application for streamin and download Anime subtitle Bahasa Indonesia"}),Object(j.jsxs)("div",{className:"",children:[Object(j.jsx)("div",{className:"card d-inline p-2 me-2",children:"Flutter"}),Object(j.jsx)("div",{className:"card d-inline p-2",children:"Flutter"})]})]})})]})})})})]})})})}function N(){Object(c.useState)(0);return Object(j.jsx)("header",{children:Object(j.jsx)("nav",{className:"navbar navbar-light navbar-expand-lg scrolling-navbar",children:Object(j.jsxs)("div",{className:"container navbar-nav",children:[Object(j.jsxs)(l.c,{activeClassName:"",to:"/",index:!0,className:"navbar-brand item",children:[Object(j.jsx)("img",{src:"/assets/logo.svg",alt:"",width:"24",height:"24",class:"d-inline-block align-text-top me-2"}),"febryardiansyah"]}),Object(j.jsxs)("div",{className:"d-flex nav-item ",children:[Object(j.jsx)(l.c,{activeClassName:"",to:"/posts",className:"nav-link item",children:"Blog"}),Object(j.jsx)(l.c,{activeClassName:"",to:"/projects",className:"nav-link item",children:"Projects"}),Object(j.jsx)(l.c,{activeClassName:"",to:"/about",className:"nav-link item",children:"About me"})]})]})})})}var y=function(){return Object(j.jsxs)(l.a,{children:[Object(j.jsx)(N,{}),Object(j.jsxs)(r.c,{children:[Object(j.jsx)(r.a,{element:Object(j.jsx)(o,{}),path:"/",index:!0}),Object(j.jsx)(r.a,{element:Object(j.jsx)(b,{}),path:"/about"}),Object(j.jsx)(r.a,{element:Object(j.jsx)(u,{}),path:"/posts",children:Object(j.jsx)(r.a,{element:Object(j.jsx)(p.a,{}),path:":slug"})}),Object(j.jsx)(r.a,{element:Object(j.jsx)(f,{}),path:"/projects"})]})]})},w=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,104)).then((function(s){var a=s.getCLS,c=s.getFID,t=s.getFCP,n=s.getLCP,i=s.getTTFB;a(e),c(e),t(e),n(e),i(e)}))};i.a.render(Object(j.jsx)(t.a.StrictMode,{children:Object(j.jsx)(y,{})}),document.getElementById("root")),w()},31:function(e,s){},36:function(e,s,a){},37:function(e,s,a){},38:function(e,s,a){}},[[103,1,2]]]);
//# sourceMappingURL=main.a7d27712.chunk.js.map