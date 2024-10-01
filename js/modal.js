
/**
 * Modal
 *
 * @copyright	Copyright (c) ecto.lt
 * @author		Benas Valančius <benas@ecto.lt>
 * @url			https://ecto.lt
 * @version		0.1.3
 */

class Modal
{
	obj;
	ol; // TODO: add here reference of overlay?
	timeout = 150; // same as "fade" effect .15s
	// TODO: jei spaudi ant fono zoominti modala kazkiek, kaip bootstrap?
	// TODO: optionas, jei spaudi ant fono uzsidaro dialogas?
	// TODO: omm
	omm = false; // one modal mode - previous modal will be hidden until top is closed

	// defaults
	opt = {
		id : false,
		title : '',
		html : '',
		width: false,
		addClass : '',
		replace : false, // close open modal (keeps overlay open on change)
		tplClose : '<button type="button" class="btn-close ui-modal-close"><i></i></button>',
		callback : false,
		afterClose : false,
	}

	constructor(opt)
	{
		if(typeof(opt) === 'string')
			opt = {html:opt};

		this.opt = {...this.opt, ...opt};

		if(!this.opt.id)
			this.opt.id = `ui_modal_${this._randomId()}`;

		if(typeof(window.modalEscapeEventSet) === 'undefined')
		{
			document.addEventListener('keydown', (event)=> {
				if(event.key === 'Escape')
					ModalClose();
			});
			window.modalEscapeEventSet = 1;
		}

		if(typeof(this.opt.footer) !== 'undefined')
			alert('footer');

		this.open();
	}

	open()
	{
		if(typeof(window.global_zindex) === 'undefined')
			window.global_zindex = 2000;

		// increase by 2 (1 for modal, 2 for overlay)
		window.global_zindex++;
		window.global_zindex++;

		this.opt.zindex = window.global_zindex;

		let s = `z-index:${this.opt.zindex};`;

		if(this.opt.width)
		{
			let w = this.opt.width;

			if(this.opt.width.toString().indexOf('%') === -1 && this.opt.width.toString().indexOf('em') === -1 && this.opt.width.toString().indexOf('rem') === -1)
				w = w + 'px';

			s += `--bs-modal-width:${w};`;
		}

		const header = (
			this.opt.title === ''
			? `<div class="modal-header no-title">${this.opt.tplClose}</div>`
			: `<div class="modal-header row g-0 align-items-center"><div class="col"><div class="modal-title">${this.opt.title}</div></div><div class="col-auto">${this.opt.tplClose}</div></div>`
		);

		const html = `<div class="modal ui-modal ${this.opt.addClass} fade" tabindex="-1" id="${this.opt.id}" style="${s}" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content">${header}<div class="modal-body"></div></div></div></div>`;

		let old = document.getElementById(this.opt.id);

		if(old)
		{
			old.id = `old_${old.id}`;
			old.dispatchEvent(new Event('modal.remove'));
		}

		document.body.insertAdjacentHTML('beforeend', html);
		// we need this method for script to work
		//const node = document.createRange().createContextualFragment(html);
		//document.body.append(node);

		this.obj = document.getElementById(this.opt.id);

		this.obj.addEventListener('modal.show', (event) => {
			this.show();
		});

		this.obj.addEventListener('modal.close', (event) => {
			this.close();
		});

		// only for replace
		this.obj.addEventListener('modal.remove', (event) => {
			this.remove();
		});

		if(this.opt.replace)
		{
			const e = document.querySelectorAll('.ui-modal.show');

			if(e.length > 0)
			{
				let el = e[e.length - 1];

				el.dispatchEvent(new Event('modal.remove'));
			}
		}

		setTimeout((modal) => {
				const node = document.createRange().createContextualFragment(modal.opt.html);
				modal.obj.querySelector('.modal-body').append(node);

				const oc = modal.obj.querySelectorAll('.ui-modal-close');

				if(oc)
				{
					oc.forEach(i => {
						i.addEventListener('click', (event) => {
							modal.close();
						});
					});
				}

				modal.obj.dispatchEvent(new Event('modal.show'));

				// TODO: reikia sito?
				if(typeof(project) !== 'undefined' && typeof(project.cfg_modal_callback) !== 'undefined')
					project.cfg_modal_callback();

				modal._call(modal.opt.callback);
			},
			1,
			this);
	}

	overlay()
	{
		let zindex = this.opt.zindex - 1;
		// this.ol
		let ol = document.getElementById('ui-modal-overlay');

		if(ol)
		{
			ol.style.zIndex = zindex;
		}
		else
		{
			ol = `<div id="ui-modal-overlay" class="fade" style="z-index:${zindex}" />`;
			document.body.insertAdjacentHTML('beforeend', ol);

			document.getElementById('ui-modal-overlay').classList.add('show');
		}
	}

	overlayHide()
	{
		let ol = document.getElementById('ui-modal-overlay');

		ol.classList.remove('show');
		document.body.style.width = 'auto';
		document.body.classList.remove('overflow-hidden');

		setTimeout((modal) => {
				ol.remove();
			},
			this.timeout,
			this);
	}

	show()
	{
		document.body.style.width = document.body.offsetWidth +'px';
		document.body.classList.add('overflow-hidden');

		this.obj.classList.add('show');
		this.overlay();

		if(typeof(fw) !== 'undefined')
			fw.loading.hide();
	}

	hide()
	{
		this.obj.classList.remove('show');
		this.overlay();
	}

	remove()
	{
		this.obj.classList.add('overflow-hidden');
		this.hide();

		setTimeout((modal) => {
				modal.obj.remove();
				modal._call(modal.opt.afterClose);
			},
			this.timeout,
			this);
	}

	close()
	{
		this.remove();

		// show lower level dialog
		const e = document.querySelectorAll('.ui-modal.show');

		if(e.length < 1)
		{
			this.overlayHide();
			return;
		}

		const le = e[e.length - 1];

		le.dispatchEvent(new Event('modal.show'));
	}

	_call(f)
	{
		if(!f)
			return;

		if(typeof(f) === 'string')
			eval(f);
		else
			f(this);
	}

	_randomId()
	{
		const l = 6;
		const c = 'abcdefghijklmnopqrstuvwxyz';
		let r = '';
		let i;

		for(let x = 0; x < l; x++)
		{
			i = Math.floor(Math.random() * c.length);
			r += c.charAt(i);
		}

		return r;
	}
}

function ModalClose(el)
{
	if(typeof(el) === 'undefined')
	{
		const e = document.querySelectorAll('.ui-modal.show');

		if(e.length < 1)
			return;

		el = e[e.length - 1];
	}

	if(!el.classList.contains('ui-modal'))
		el = el.closest('.ui-modal');

	el.dispatchEvent(new Event('modal.close'));
}