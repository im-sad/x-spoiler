document.addEventListener(`DOMContentLoaded`, function() {
  `use strict`;

  // TODO: Add throttle

  (function initSpoilers() {
    const spolersList = document.querySelectorAll(`[data-spoiler]`);
    let windowWidth = getWindowWidth();

    for (let i = 0; i < spolersList.length; i++) {
      const spolersListItem = spolersList[i];
      spolersListItem.classList.add(`x-spoiler__inner`)

      // create text wrapper
      const spoilerWrapper = document.createElement(`div`);

      spoilerWrapper.className = `x-spoiler`;
      spolersListItem.parentNode.insertBefore(spoilerWrapper, spolersListItem);
      spoilerWrapper.appendChild(spolersListItem);

      // create btn
      const spoilerShowText = spolersListItem.dataset.spoiler || `Show`;
      const spoilerHideText = spolersListItem.dataset.spoilerHide;
      const spoilerBtn = document.createElement(`div`);
      const spoilerBtnLink = document.createElement(`div`);
      const spoilerBtnLinkShow = document.createElement(`span`);

      spoilerBtn.className = `x-spoiler__more`;
      spoilerBtnLink.className = `x-spoiler__more-link`;

      spoilerBtnLinkShow.textContent = spoilerShowText;
      spoilerBtnLinkShow.classList.add(`x-spoiler__more-show`);

      spoilerBtn.appendChild(spoilerBtnLink);
      spoilerWrapper.appendChild(spoilerBtn);

      spoilerBtnLink.appendChild(spoilerBtnLinkShow);

      if (spoilerHideText) {
        const spoilerBtnLinkHide = document.createElement(`span`);
        spoilerBtnLinkHide.classList.add(`x-spoiler__more-hide`);
        spoilerBtnLinkHide.textContent = spoilerHideText;
        spoilerBtnLink.appendChild(spoilerBtnLinkHide);

        spoilerWrapper.classList.add(`x-spoiler--has-toggle`);
      } else {
        spoilerWrapper.classList.add(`x-spoiler--no-toggle`);
      }


      reDraw(spolersListItem);

      spoilerBtnLink.addEventListener(`click`, function(e) {
        toggleVisibility(e.currentTarget);
      }, false);
    }

    window.addEventListener(`resize`, function() {
      const newWindowWidth = getWindowWidth();

      // if width change
      if (newWindowWidth !== windowWidth) {
        for (let i = 0; i < spolersList.length; i++) {
          reDraw(spolersList[i]);
        }

        windowWidth = newWindowWidth;
      }
    });

    function toggleVisibility(el) {
      const mainBlock = el.parentNode.parentNode;
      const mainBlockText = mainBlock.getElementsByClassName(`x-spoiler__inner`)[0];

      if (mainBlock.classList.contains(`is-opened`)) {
        mainBlock.classList.remove(`is-opened`);
        mainBlockText.style.maxHeight = null;
      } else {
        mainBlock.classList.add(`is-opened`);
        mainBlockText.style.maxHeight = mainBlockText.scrollHeight + `px`;
      }
    }


    function reDraw(el) {
      const hasElScroll = el.scrollHeight > el.clientHeight;
      const parentBlock = el.parentNode;

      el.style.maxHeight = null;

      if (hasElScroll) {
        parentBlock.classList.add(`x-spoiler--is-collapsed`);
        parentBlock.classList.remove(`is-opened`);
      } else {
        parentBlock.classList.remove(`x-spoiler--is-collapsed`);
        parentBlock.classList.add(`is-opened`);
      }
    }

    function getWindowWidth() {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  })();

});