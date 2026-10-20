/*
	Twenty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() { return $header.height() + 10; }
		});

	// Dropdowns (hover/focus handled in CSS; click toggles for touch).
		(function() {

			var $items = $('#nav li.has-dropdown');

			function close($li) {
				$li.removeClass('open').children('a').attr('aria-expanded', 'false');
			}

			$items.children('a').on('click', function(event) {

				var $li = $(this).parent();

				// On touch devices, first tap opens the menu; second tap follows the link.
					if (browser.mobile && !$li.hasClass('open')) {
						event.preventDefault();
						close($items);
						$li.addClass('open');
						$(this).attr('aria-expanded', 'true');
					}

			});

			// Close on outside click or Escape.
				$(document)
					.on('click touchstart', function(event) {
						if (!$(event.target).closest('#nav li.has-dropdown').length)
							close($items);
					})
					.on('keydown', function(event) {
						if (event.key == 'Escape') {
							close($items);
							document.activeElement.blur();
						}
					});

			// Keep aria-expanded in sync for keyboard/hover users.
				$items.on('mouseenter focusin', function() {
					$(this).children('a').attr('aria-expanded', 'true');
				}).on('mouseleave focusout', function() {
					if (!$(this).hasClass('open'))
						$(this).children('a').attr('aria-expanded', 'false');
				});

		})();

	// Nav Panel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

		// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
			if (browser.os == 'wp' && browser.osVersion < 10)
				$('#navButton, #navPanel, #page-wrapper')
					.css('transition', 'none');

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

})(jQuery);