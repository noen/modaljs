# Modal JS
Dynamic lightweight modal dialog written in vanilla JavaScript.

Do you like Bootstrap modals? But would like to create them dynamicly? Multilevel?

View live [DEMO](https://aitija.lt/modaljs/index.html).

## Style

Modal uses default Bootstrap v5 styles + little extra. 
I like sticky header and footer feel free to remove them if you don't need it.

`Bootstrap v5 styling changes + sticky`
````css
.modal-backdrop {
	--bs-backdrop-opacity: 1;
	background: rgba(255, 255, 255, .25);
	backdrop-filter: blur(2px);
	display: none !important;
}
.modal-header {
	background-color: rgba(249, 250, 253, 1) !important;
	border: 0;
	padding: 0;
	position: sticky;
	top: 0;
	background-color: inherit;
	z-index: 10;
}
.modal-header .modal-title {
	padding: var(--bs-modal-header-padding);
	font-size: 1.25rem;
	font-weight: 500;
	width: 100%;
}
.modal-content {
	position: relative;
	border: 0 none;
	box-shadow: 0 8px 48px rgba(0, 0, 0, .33) !important;
}
.modal-footer {
	justify-content: flex-start;
	position: sticky;
	bottom: 0;
	z-index: 10;
	margin: 0 -1rem -1rem;
	background-color: #fff;
}
.modal-header .btn-close {
	font-size: 1.5rem;
	line-height: 0;
	color: black;
	background: transparent;
	background: rgba(0, 0, 0, .05);
	border-radius: 50%;
	position: absolute;
	z-index: 5;
	right: 0.75em;
	top: 0.75em;
	box-shadow: none;
}
.modal-header .btn-close i {
	background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzODQgNTEyIj48cGF0aCBkPSJNMzQ1IDEzN2M5LjQtOS40IDkuNC0yNC42IDAtMzMuOXMtMjQuNi05LjQtMzMuOSAwbC0xMTkgMTE5TDczIDEwM2MtOS40LTkuNC0yNC42LTkuNC0zMy45IDBzLTkuNCAyNC42IDAgMzMuOWwxMTkgMTE5TDM5IDM3NWMtOS40IDkuNC05LjQgMjQuNiAwIDMzLjlzMjQuNiA5LjQgMzMuOSAwbDExOS0xMTlMMzExIDQwOWM5LjQgOS40IDI0LjYgOS40IDMzLjkgMHM5LjQtMjQuNiAwLTMzLjlsLTExOS0xMTlMMzQ1IDEzN3oiLz48L3N2Zz4=);
	background-size: contain;
	background-position: center top;
	background-repeat: no-repeat;
	display: block;
	width: 1em;
	height: 1em;
}
.modal-header .btn-close:hover,
.modal-header .btn-close:focus {
	opacity: 1 !important;
	background-color: #eee;
}
div.modal-backdrop ~ div.modal ~ div.modal-backdrop {
	display: none;
}
#ui-modal-loading .spinner-border {
	outline: 1rem solid rgba(255, 255, 255, .5);
	background: rgba(255, 255, 255, .5);
}
#ui-modal-overlay {
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	background: rgba(0, 0, 0, .5);
	backdrop-filter: blur(2px);
}
#ui-modal-overlay.show {
	opacity: 1;
}
.ui-modal {
	display: block;
	padding: 0 1rem;
}
.ui-modal .modal-header {
	padding: .75rem 1rem;
}
.ui-modal .modal-header .ui-modal-close {
	position: static;
	margin: 0;
}
.ui-modal .modal-header .modal-title {
	padding: 0;
}
.ui-modal .no-title {
	padding: 0;
}
.ui-modal .modal-header.no-title .ui-modal-close {
	position: absolute;
	top: 1rem;
	right: 1rem;
}
````

## Basic
`open`
````js
var myModal = new Modal({
	title : 'Title',
	html : 'HTML + JavaScript',
	width : 350 // px
});
````

`close`
````js
myModal.close();

// OR

ModalClose(); // will close active modal
````



## Single modal mode
Pass `id` and next Modal with same id will replace old and keep just one Model with same id.

`first Modal`
````js
new Modal({
	id : 'my-modal',
	title : 'Title',
	html : 'Step 1',
	width : 350 // px
});
````

`second Modal`
````js
new Modal({
	id : 'my-modal',
	title : 'Title',
	html : 'Step 2',
	width : 350 // px
});
````


## Options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | string | null | Modal title [optional] |
| html | string | null | Modal HTML. |
| id | string | null | Modal ID will relpace other with same ID. |
| width | string | null | Modal width in px, Modal acceps and other values like '20rem' or '50%'. |
| addClass | string | null | If you need additional styling for this dialog you can add css class to it. |

## Events

| Name | Description |
| ---- | ----------- |
| modal.open | TODO |
| modal.close | TODO |

