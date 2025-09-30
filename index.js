document.addEventListener('DOMContentLoaded', () => {
	/* =========================
     SELECT
  ========================= */
	const trigger = document.querySelector('[data-select]')
	const options = document.querySelectorAll('.custom-select__option')

	if (trigger) {
		trigger.addEventListener('click', e => {
			e.stopPropagation()
			trigger.classList.toggle('open')
		})

		options.forEach(option => {
			option.addEventListener('click', () => {
				trigger.classList.remove('open')
			})
		})

		document.addEventListener('click', e => {
			if (!trigger.contains(e.target)) {
				trigger.classList.remove('open')
			}
		})
	}

	/* =========================
     KEBAB MENU
  ========================= */

	const closeMenu = menu => {
		if (!menu) return
		menu.classList.remove('open-menu')
		const kebab = menu.parentElement.querySelector('.kebab')
		if (kebab) kebab.setAttribute('aria-expanded', 'false')
	}

	const closeAllMenus = () => {
		document.querySelectorAll('.row-menu.open-menu').forEach(closeMenu)
	}

	document.addEventListener('click', e => {
		const kebabBtn = e.target.closest('.kebab')
		if (kebabBtn) {
			e.stopPropagation()
			const cell =
				kebabBtn.closest('td, .cell-actions') || kebabBtn.parentElement
			const menu = cell.querySelector('.row-menu')

			const willOpen = !menu.classList.contains('open-menu')
			closeAllMenus()

			if (willOpen) {
				menu.classList.add('open-menu')
				kebabBtn.setAttribute('aria-expanded', 'true')
			}
			return
		}

		const closeBtn = e.target.closest('.row-menu [data-act="close"]')
		if (closeBtn) {
			closeMenu(closeBtn.closest('.row-menu'))
			return
		}

		if (!e.target.closest('.row-menu')) {
			closeAllMenus()
		}
	})

	document.querySelectorAll('.row-menu').forEach(menu => {
		menu.addEventListener('mouseleave', () => closeMenu(menu))
	})
})
