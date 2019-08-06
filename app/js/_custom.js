document.addEventListener("DOMContentLoaded", function () {

	document.querySelector('.mobile-menu') && document.querySelector('.mobile-menu').addEventListener('click', () => {
		document.querySelector('.mobile-menu').classList.toggle('is-active');
		document.querySelector('.main-nav').classList.toggle('opened');
		document.querySelector('.logo-wrap').classList.toggle('center');
	})
	if (document.querySelector('.search-line .select-box')) {
		document.querySelector('.search-line .select-box').addEventListener('click', function () {
			this.classList.toggle('active');
		})
	}
	if (document.querySelector('.to-top')) {
		if (window.scrollY) {
			if (window.scrollY > 100) document.querySelector('.to-top').style.display = 'block';
			else document.querySelector('.to-top').style.display = 'none';
		}
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) document.querySelector('.to-top').style.display = 'block';
			else document.querySelector('.to-top').style.display = 'none';
		})
	}
	const scene = document.getElementById('scene');
	const parallaxInstance = scene && new Parallax(scene, {
		relativeInput: true,
		clipRelativeInput: true,
		frictionX: 0.01,
		scalarX: 1,
		scalarY: 0,
		selector: '.layer',
		pointerEvents: true
	});
	document.querySelectorAll('.list-cards li').forEach((el) => {
		el.addEventListener('click', () => {
			el.classList.toggle('active');
		})
	})
	const tooltip = document.querySelector('.map-tooltip');
	const wrapAgencies = document.querySelector('.wrapper-agencies');
	const intro = document.querySelector('.introduction');
	const map = document.getElementById('map');
	const mainNav = document.getElementsByClassName('main-nav')[0];
	document.querySelector('.wrapper-agencies .close') && document.querySelector('.wrapper-agencies .close').addEventListener('click', () => {
		// wrapAgencies.style.display = "none";
		wrapAgencies.style.opacity = 0;
		setTimeout(() => {
			wrapAgencies.style.display = "none";
		}, 500)
		intro.style.display = "block";
		wrapAgencies.parentNode.style.flexGrow = "1";
		document.querySelectorAll('#map path').forEach((el) => {
			el.classList.remove('active');
		})
		map.classList.remove('small');
	})
	document.querySelectorAll('#map path').forEach((el) => {
		el.addEventListener('mouseenter', () => {
			tooltip.innerHTML = el.attributes.title.nodeValue;
			tooltip.style.display = 'block';
		});
		el.addEventListener('mousemove', function (e) {
			tooltip.style.top = e.offsetY - tooltip.offsetHeight - 20 + 'px';
			tooltip.style.left = e.offsetX - tooltip.offsetWidth / 2 + 'px';
		});
		el.addEventListener('mouseleave', function () {
			tooltip.style.display = 'none';
		});
		el.addEventListener('click', () => {
			document.querySelectorAll('#map path').forEach((el) => {
				el.classList.remove('active');
			})
			wrapAgencies.style.display = "block";
			// setTimeout(() => {
			// 	wrapAgencies.style.display = "block";
			// }, 500)
			wrapAgencies.style.opacity = 1;
			wrapAgencies.parentNode.style.flexGrow = "1.2";
			intro.style.display = "none";
			el.classList.add('active');
			map.classList.add('small');
		})
	})
	document.querySelectorAll('#map use').forEach((el) => {
		el.addEventListener('mouseenter', () => {
			tooltip.innerHTML = `<img src="${el.dataset.logo}" alt=""><span>${el.dataset.title}</span>`;
			tooltip.style.display = 'block';
		});
		el.addEventListener('mousemove', (e) => {
			tooltip.style.top = e.offsetY - tooltip.offsetHeight - 20 + 'px';
			tooltip.style.left = e.offsetX - tooltip.offsetWidth / 2 + 'px';
		});
		el.addEventListener('mouseleave', () => {
			tooltip.style.display = 'none';
		});
	})
	document.querySelectorAll('.main-nav a').forEach((el) => {
		el.addEventListener('mouseenter', () => {
			mainNav.classList.add('hovered');
		});
		el.addEventListener('mouseleave', () => {
			mainNav.classList.remove('hovered');
		});
	})

	let lazyFIU = [].slice.call(document.querySelectorAll('.lazy-FIU'));

	function animateCSS(node, animationName) {
		node.classList.add('animated', animationName)

		function handleAnimationEnd() {
			node.classList.remove('animated', animationName)
			node.removeEventListener('animationend', handleAnimationEnd)
		}

		node.addEventListener('animationend', handleAnimationEnd)
	}
	if ('IntersectionObserver' in window) {
		let lazyFIUObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					animateCSS(entry.target, 'fadeInUp')
					lazyFIUObserver.unobserve(entry.target);
				}
			});
		});
		lazyFIU.forEach(function (lazyAnimationItem) {
			lazyFIUObserver.observe(lazyAnimationItem);
		});
	}

	function Calendar3(id, year, month) {
		var Dlast = new Date(year, month + 1, 0).getDate(),
			D = new Date(year, month, Dlast),
			DNlast = D.getDay(),
			DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
			calendar = '<tr>',
			m = document.querySelector('#' + id + ' option[value="' + D.getMonth() + '"]'),
			g = document.querySelector('#' + id + ' input');
		if (DNfirst != 0) {
			for (let i = 1; i < DNfirst; i++) calendar += '<td>';
		} else {
			for (let i = 0; i < 6; i++) calendar += '<td>';
		}
		for (let i = 1; i <= Dlast; i++) {
			if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
				calendar += '<td class=\'today\'>' + i;
			} else {
				calendar += '<td>' + i;
			}
			if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
				calendar += '<tr>';
			}
		}
		for (let i = DNlast; i < 7; i++) calendar += '<td>';
		document.querySelector('#' + id + ' tbody').innerHTML = calendar;
		g.value = D.getFullYear();
		m.selected = true;
		document.querySelector('#' + id + ' option[value=\'' + new Date().getMonth() + '\']').style.color = 'rgb(220, 0, 0)'; // в выпадающем списке выделен текущий месяц
	}
	if (document.querySelector('#calendar')) {
		Calendar3("calendar", new Date().getFullYear(), new Date().getMonth());
		document.querySelector('#calendar').onchange = () => {
			Calendar3("calendar", document.querySelector('#calendar input').value, parseFloat(document.querySelector('#calendar select').options[document.querySelector('#calendar select').selectedIndex].value));
		}
		Calendar3("calendar", new Date().getFullYear(), new Date().getMonth());
		document.querySelector('#calendar .prev').onclick = () => {
			const prevYear = document.querySelector('#calendar input').value,
				prevMonth = parseFloat(document.querySelector('#calendar select').options[document.querySelector('#calendar select').selectedIndex].value);
			if (prevMonth != 0) {
				document.querySelector('#calendar select').selectedIndex = prevMonth - 1;
			} else {
				document.querySelector('#calendar select').selectedIndex = 11;
				document.querySelector('#calendar input').value = +prevYear - 1;
			}
			Calendar3("calendar", document.querySelector('#calendar input').value, parseFloat(document.querySelector('#calendar select').options[document.querySelector('#calendar select').selectedIndex].value));
		}
		document.querySelector('#calendar .next').onclick = () => {
			const prevYear = document.querySelector('#calendar input').value,
				prevMonth = parseFloat(document.querySelector('#calendar select').options[document.querySelector('#calendar select').selectedIndex].value);
			if (prevMonth != 11) {
				document.querySelector('#calendar select').selectedIndex = prevMonth + 1;
			} else {
				document.querySelector('#calendar select').selectedIndex = 0;
				document.querySelector('#calendar input').value = +prevYear + 1;
			}
			Calendar3("calendar", document.querySelector('#calendar input').value, parseFloat(document.querySelector('#calendar select').options[document.querySelector('#calendar select').selectedIndex].value));
		}
	}
});