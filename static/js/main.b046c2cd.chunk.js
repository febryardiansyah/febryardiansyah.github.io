(this.webpackJsonpfebryardiansyah=this.webpackJsonpfebryardiansyah||[]).push([[0],{117:function(e,t,a){},118:function(e,t,a){},119:function(e,t,a){"use strict";a.r(t);var s=a(1),c=a.n(s),n=a(17),i=a.n(n),r=(a(39),a(40),a(6)),l=a(2),o=(a(41),a(7)),d=a(0);function j(){return Object(d.jsx)("div",{className:"container d-flex flex-column justify-content-center align-items-center mt-5",style:{height:"calc(100vh - 110px)"},children:Object(d.jsxs)("div",{className:"row mx-auto",children:[Object(d.jsxs)("div",{className:"col-md-8 col-sm-12",children:[Object(d.jsx)("h1",{style:{animation:o.animations.fadeInUp},children:"hello, i\u2019m"}),Object(d.jsx)("div",{className:"name",style:{color:"#EB5757",fontSize:"80px",fontWeight:"bold",animation:o.animations.fadeInUp},children:"Febry Ardiansyah"}),Object(d.jsx)("h4",{style:{animation:o.animations.fadeInUp},children:"Software Engineer who interested in mobile development using Flutter Framework"}),Object(d.jsx)("div",{children:Object(d.jsxs)("div",{className:"social-icon text-center mt-5 mb-3",style:{animation:o.animations.slideIn},children:[Object(d.jsx)("a",{href:"https://github.com/febryardiansyah",className:"link-secondary",children:Object(d.jsx)("i",{className:"fab fa-github me-2",children:" "})}),Object(d.jsx)("a",{href:"https://instagram.com/febry_ardiansyah24",className:"link-secondary",children:Object(d.jsx)("i",{className:"fab fa-instagram me-2"})}),Object(d.jsx)("a",{href:"mailto:febryardiansyah27@gmail.com",className:"link-secondary",children:Object(d.jsx)("i",{className:"far fa-envelope me-2"})}),Object(d.jsx)("a",{href:"https://twitter.com/febryar69",className:"link-secondary",children:Object(d.jsx)("i",{className:"fab fa-twitter me-2"})}),Object(d.jsx)("a",{href:"https://www.linkedin.com/in/febry-ardiansyah-a4b580170/",className:"link-secondary",children:Object(d.jsx)("i",{className:"fab fa-linkedin"})})]})})]}),Object(d.jsx)("div",{className:"col-md-4 d-flex justify-content-center col-sm-12",children:Object(d.jsx)("img",{src:"/assets/me2.jpeg",alt:"",className:"rounded-circle img-me",style:{objectFit:"cover",animation:o.animations.bounceIn}})})]})})}function b(){return Object(d.jsx)("div",{className:"container",children:Object(d.jsxs)("div",{className:"mt-3",children:[Object(d.jsx)("h1",{children:Object(d.jsx)("b",{children:"About me"})}),Object(d.jsxs)("div",{className:"desc",style:{animation:o.animations.fadeIn},children:[Object(d.jsx)("p",{className:"mt-5",children:"Hi, iam Febry Ardiansyah \u270b"}),Object(d.jsx)("p",{children:"Bachelor of Computer Science at the Software Engineering that currently learning Flutter, NodeJs, and ReactJS.I have a lot of experience building an Android and IOS app using Flutter SDK. I've finished a lots of project related to Flutter, i also familiar using nodejs, reactJs, mongoDB, and Firebase"})]}),Object(d.jsxs)("div",{className:"skills mt-5",style:{animation:o.animations.fadeInUp},children:[Object(d.jsx)("h2",{children:"Programming Skills"}),"Flutter",Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-10",children:Object(d.jsx)("div",{class:"progress",children:Object(d.jsx)("div",{class:"progress-bar bg-info",role:"progressbar",style:{width:"90%"},"aria-valuenow":"90","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(d.jsx)("div",{className:"col-md-2 font-monospace",children:"90%"})]}),"NodeJs",Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-10",children:Object(d.jsx)("div",{class:"progress",children:Object(d.jsx)("div",{class:"progress-bar",role:"progressbar",style:{width:"70%"},"aria-valuenow":"70","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(d.jsx)("div",{className:"col-md-2 font-monospace",children:"70%"})]}),"ReactJs",Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-10",children:Object(d.jsx)("div",{class:"progress",children:Object(d.jsx)("div",{class:"progress-bar bg-warning",role:"progressbar",style:{width:"60%"},"aria-valuenow":"60","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(d.jsx)("div",{className:"col-md-2 font-monospace",children:"60%"})]}),"MongoDB",Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("div",{className:"col-md-10",children:Object(d.jsx)("div",{class:"progress",children:Object(d.jsx)("div",{class:"progress-bar bg-danger",role:"progressbar",style:{width:"40%"},"aria-valuenow":"40","aria-valuemin":"0","aria-valuemax":"100"})})}),Object(d.jsx)("div",{className:"col-md-2 font-monospace",children:"40%"})]})]})]})})}var m=a(4),h=a(12),x=a.n(h),O=a(33),u=a.n(O)()({projectId:"wdc0uzak",dataset:"production"});function g(){var e=Object(s.useState)([]),t=Object(m.a)(e,2),a=t[0],c=t[1],n=Object(s.useState)(!1),i=Object(m.a)(n,2),l=i[0],o=i[1];return Object(s.useEffect)((function(){o(!0),u.fetch("*[_type == \"post\"]{\n            _id,\n            title,\n            slug,\n            body,\n            publishedAt,\n            \"categories\":categories[]{\n                _type == 'reference' => @->,\n                _type != 'reference' => @,\n            },\n            mainImage{\n                asset->{\n                    _id,\n                    url\n                },\n                alt\n            }\n        }").then((function(e){o(!1),c(e)})).catch((function(e){return console.log(e.responseBody)}))}),[]),console.log(a),l?Object(d.jsx)("div",{className:"container",children:"Loading.."}):Object(d.jsx)("div",{className:"container mt-5",children:Object(d.jsx)(x.a,{children:Object(d.jsx)("div",{className:"row",children:a&&a.map((function(e){return Object(d.jsx)("div",{className:"col-md-6 mb-3",children:Object(d.jsx)(r.b,{to:"/post/".concat(e.slug.current),className:"link",style:{color:"black",textDecoration:"none"},children:Object(d.jsxs)("div",{class:"card",children:[Object(d.jsxs)("div",{class:"card-body",children:[Object(d.jsx)("h4",{class:"card-title",children:Object(d.jsx)("b",{children:e.title})}),e.categories&&e.categories.map((function(e){return Object(d.jsx)("div",{className:"badge bg-secondary me-1",children:e.title})})),Object(d.jsx)("p",{class:"card-text",children:e.body[0].children[0].text.length>120?"".concat(e.body[0].children[0].text.substring(0,120),".."):e.body[0].children[0].text})]}),Object(d.jsx)("div",{class:"card-footer text-muted font-monospace",children:new Date(e.publishedAt).toLocaleDateString()})]})},e.slug.current)})}))})})})}var v=a(34),p=a.n(v);function f(){var e=Object(s.useState)({}),t=Object(m.a)(e,2),a=t[0],c=t[1],n=Object(s.useState)(!1),i=Object(m.a)(n,2),r=i[0],o=i[1],j=Object(l.g)().slug;return Object(s.useEffect)((function(){o(!0),u.fetch('*[slug.current == "'.concat(j,"\"]{\n            _id,\n            title,\n            slug,\n            body,\n            publishedAt,\n            \"categories\":categories[]{\n                _type == 'reference' => @->,\n                _type != 'reference' => @,\n            },\n            mainImage{\n                asset->{\n                    _id,\n                    url\n                },\n                alt\n            }\n        }")).then((function(e){o(!1),c(e[0])})).catch((function(e){return console.log(e)}))}),{}),console.log(a),r?Object(d.jsx)("div",{className:"container",children:"Loading.."}):Object(d.jsx)("article",{children:Object(d.jsxs)("div",{className:"container mt-5",children:[Object(d.jsx)("h1",{children:a.title}),Object(d.jsx)("div",{className:"text-muted",children:a.publishedAt}),Object(d.jsxs)("span",{className:"d-flex mt-2",children:[Object(d.jsx)("div",{className:"text-muted",children:"Categories : "}),a.categories&&a.categories.map((function(e){return Object(d.jsx)("div",{className:"badge bg-secondary me-1",children:e.title})}))]}),Object(d.jsx)("div",{className:"mt-5",children:Object(d.jsx)(p.a,{blocks:a.body,projectId:"wdc0uzak",dataset:"production"})})]})})}a(117);function N(){var e=Object(s.useState)([]),t=Object(m.a)(e,2),a=t[0],c=t[1],n=Object(s.useState)(!1),i=Object(m.a)(n,2),r=i[0],l=i[1];return Object(s.useEffect)((function(){l(!0),u.fetch('*[_type == "project"]{\n            title,\n            description,\n            publishedAt,\n            link,\n            tags,\n            mainImage{\n                asset->{\n                    _id,\n                    url\n                },\n                alt\n            }\n        }').then((function(e){l(!1),c(e)})).catch((function(e){return console.log(e.responseBody)}))}),[]),console.log(a),r?Object(d.jsx)("div",{className:"container",children:"Loading..."}):Object(d.jsx)("div",{className:"container mt-5",children:Object(d.jsx)(x.a,{children:Object(d.jsx)("div",{className:"row",children:a&&a.map((function(e){return Object(d.jsx)("div",{className:"col-md-6",children:Object(d.jsx)("a",{href:e.link,children:Object(d.jsxs)("div",{class:"card mb-3",children:[Object(d.jsx)("img",{src:e.mainImage.asset.url,class:"card-img-top",alt:"..."}),Object(d.jsxs)("div",{class:"card-body",children:[Object(d.jsx)("h5",{class:"card-title",children:Object(d.jsx)("b",{children:e.title})}),Object(d.jsx)("p",{class:"card-text",children:e.description}),e.tags.map((function(e){return Object(d.jsx)("div",{className:"card d-inline p-2 me-2 mt-2",children:e})})),Object(d.jsx)("p",{class:"card-text mt-4",children:Object(d.jsx)("small",{class:"text-muted",children:new Date(e.publishedAt).toLocaleDateString()})})]})]})})})}))})})})}a(118);function y(){return Object(d.jsx)("header",{children:Object(d.jsx)("nav",{className:"navbar navbar-light navbar-expand-lg scrolling-navbar",children:Object(d.jsxs)("div",{className:"container",children:[Object(d.jsxs)(r.c,{activeClassName:"",to:"/",index:!0,className:"navbar-brand",children:[Object(d.jsx)("img",{src:"/assets/logo.svg",alt:"",width:"24",height:"24",class:"d-inline-block align-text-top me-2"}),"febryardiansyah;"]}),Object(d.jsx)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(d.jsx)("span",{class:"navbar-toggler-icon"})}),Object(d.jsx)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:Object(d.jsxs)("div",{className:"navbar-nav ms-auto mb-2 mb-lg-0",children:[Object(d.jsx)(r.c,{activeClassName:"",to:"/posts",className:"nav-link nav-item",children:"Blog"}),Object(d.jsx)(r.c,{activeClassName:"",to:"/projects",className:"nav-link nav-item",children:"Projects"}),Object(d.jsx)(r.c,{activeClassName:"",to:"/about",className:"nav-link nav-item",children:"About me"})]})})]})})})}var w=function(){return Object(d.jsxs)(r.a,{children:[Object(d.jsx)(y,{}),Object(d.jsxs)(l.c,{children:[Object(d.jsx)(l.a,{element:Object(d.jsx)(j,{}),path:"/",index:!0}),Object(d.jsx)(l.a,{element:Object(d.jsx)(b,{}),path:"/about"}),Object(d.jsx)(l.a,{element:Object(d.jsx)(g,{}),path:"/posts"}),Object(d.jsx)(l.a,{element:Object(d.jsx)(f,{}),path:"/post/:slug"}),Object(d.jsx)(l.a,{element:Object(d.jsx)(N,{}),path:"/projects"})]})]})},k=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,120)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,n=t.getLCP,i=t.getTTFB;a(e),s(e),c(e),n(e),i(e)}))};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(w,{})}),document.getElementById("root")),k()},39:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){}},[[119,1,2]]]);
//# sourceMappingURL=main.b046c2cd.chunk.js.map