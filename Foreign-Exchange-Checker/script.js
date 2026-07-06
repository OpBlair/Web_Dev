'use strict';

// --- Global States & Selectors ---
const picker = document.getElementById('currency-picker');
const triggerBtns = document.querySelectorAll('.currency-select-btn');
let activeTriggerButton = null;

// --- Currencies Dataset ---
const currencies = [
  {code: 'ARS', name: 'Argentine Peso', flag: './assets/images/flags/ar.webp', popular: false},
  {code: 'AUD', name: 'Australian Dollar', flag: './assets/images/flags/au.webp', popular: true},
  {code: 'BDT', name: 'Bangladeshi Taka', flag: './assets/images/flags/bd.webp', popular: false},
  {code: 'BGN', name: 'Bulgarian Lev', flag: './assets/images/flags/bg.webp', popular: false},
  {code: 'BHD', name: 'Bahraini Dinar', flag: './assets/images/flags/bh.webp', popular: false},
  {code: 'BRL', name: 'Brazilian Real', flag: './assets/images/flags/br.webp', popular: false},
  {code: 'CAD', name: 'Canadian Dollar', flag: './assets/images/flags/ca.webp', popular: true},
  {code: 'CHF', name: 'Swiss Franc', flag: './assets/images/flags/ch.webp', popular: true},
  {code: 'CLP', name: 'Chilean Peso', flag: './assets/images/flags/cl.webp', popular: false},
  {code: 'CNY', name: 'Chinese Yuan', flag: './assets/images/flags/cn.webp', popular: true},
  {code: 'COP', name: 'Colombian Peso', flag: './assets/images/flags/co.webp', popular: false},
  {code: 'CZK', name: 'Czech Koruna', flag: './assets/images/flags/cz.webp', popular: false},
  {code: 'DKK', name: 'Danish Krone', flag: './assets/images/flags/dk.webp', popular: false},
  {code: 'EGP', name: 'Egyptian Pound', flag: './assets/images/flags/eg.webp', popular: false},
  {code: 'EUR', name: 'Euro', flag: './assets/images/flags/eu.webp', popular: true},
  {code: 'GBP', name: 'British Pound', flag: './assets/images/flags/gb.webp', popular: true},
  {code: 'HKD', name: 'Hong Kong Dollar', flag: './assets/images/flags/hk.webp', popular: false},
  {code: 'HNL', name: 'Honduran Lempira', flag: './assets/images/flags/hn.webp', popular: false},
  {code: 'HTG', name: 'Haitian Gourde', flag: './assets/images/flags/ht.webp', popular: false},
  {code: 'HUF', name: 'Hungarian Forint', flag: './assets/images/flags/hu.webp', popular: false},
  {code: 'IDR', name: 'Indonesian Rupiah', flag: './assets/images/flags/id.webp', popular: false},
  {code: 'INR', name: 'Indian Rupee', flag: './assets/images/flags/in.webp', popular: false},
  {code: 'ISK', name: 'Icelandic Króna', flag: './assets/images/flags/is.webp', popular: false},
  {code: 'JOD', name: 'Jordanian Dinar', flag: './assets/images/flags/jo.webp', popular: false},
  {code: 'JPY', name: 'Japanese Yen', flag: './assets/images/flags/jp.webp', popular: true},
  {code: 'KES', name: 'Kenyan Shilling', flag: './assets/images/flags/ke.webp', popular: false},
  {code: 'KRW', name: 'South Korean Won', flag: './assets/images/flags/kr.webp', popular: false},
  {code: 'KWD', name: 'Kuwaiti Dinar', flag: './assets/images/flags/kw.webp', popular: false},
  {code: 'LBP', name: 'Lebanese Pound', flag: './assets/images/flags/lb.webp', popular: false},
  {code: 'XCD', name: 'East Caribbean Dollar', flag: './assets/images/flags/lc.webp', popular: false},
  {code: 'LKR', name: 'Sri Lankan Rupee', flag: './assets/images/flags/lk.webp', popular: false},
  {code: 'MAD', name: 'Moroccan Dirham', flag: './assets/images/flags/ma.webp', popular: false},
  {code: 'MXN', name: 'Mexican Peso', flag: './assets/images/flags/mx.webp', popular: false},
  {code: 'MYR', name: 'Malaysian Ringgit', flag: './assets/images/flags/my.webp', popular: false},
  {code: 'NGN', name: 'Nigerian Naira', flag: './assets/images/flags/ng.webp', popular: false},
  {code: 'NOK', name: 'Norwegian Krone', flag: './assets/images/flags/no.webp', popular: false},
  {code: 'NPR', name: 'Nepalese Rupee', flag: './assets/images/flags/np.webp', popular: false},
  {code: 'NZD', name: 'New Zealand Dollar', flag: './assets/images/flags/nz.webp', popular: false},
  {code: 'OMR', name: 'Oman Rial', flag: './assets/images/flags/om.webp', popular: false},
  {code: 'PEN', name: 'Peruvian Sol', flag: './assets/images/flags/pe.webp', popular: false},
  {code: 'PHP', name: 'Philippine Peso', flag: './assets/images/flags/ph.webp', popular: false},
  {code: 'PKR', name: 'Pakistani Rupee', flag: './assets/images/flags/pk.webp', popular: false},
  {code: 'PLN', name: 'Polish Zloty', flag: './assets/images/flags/pl.webp', popular: false},
  {code: 'QAR', name: 'Qatari Riyal', flag: './assets/images/flags/qa.webp', popular: false},
  {code: 'RON', name: 'Romanian Leu', flag: './assets/images/flags/ro.webp', popular: false},
  {code: 'RUB', name: 'Russian Ruble', flag: './assets/images/flags/ru.webp', popular: false},
  {code: 'SAR', name: 'Saudi Riyal', flag: './assets/images/flags/sa.webp', popular: false},
  {code: 'SEK', name: 'Swedish Krona', flag: './assets/images/flags/se.webp', popular: false},
  {code: 'SGD', name: 'Singapore Dollar', flag: './assets/images/flags/sg.webp', popular: false},
  {code: 'THB', name: 'Thai Baht', flag: './assets/images/flags/th.webp', popular: false},
  {code: 'TRY', name: 'Turkish Lira', flag: './assets/images/flags/tr.webp', popular: false},
  {code: 'TWD', name: 'New Taiwan Dollar', flag: './assets/images/flags/tw.webp', popular: false},
  {code: 'UAH', name: 'Ukrainian Hryvnia', flag: './assets/images/flags/ua.webp', popular: false},
  {code: 'USD', name: 'US Dollar', flag: './assets/images/flags/us.webp', popular: true},
  {code: 'VND', name: 'Vietnamese Dong', flag: './assets/images/flags/vn.webp', popular: false},
  {code: 'ZAR', name: 'South African Rand', flag: './assets/images/flags/za.webp', popular: false}
];

// --- Fetch Exchange Rates ---
async function fetchLatestRates(baseCurrency) {
    try {
        const response = await fetch(`https://api.frankfurter.dev/v2/rates?base=${baseCurrency}`);
        if (!response.ok) throw new Error('Network rates delivery error.');
        return await response.json();
    } catch (error) {
        console.error("Rates integration fault:", error);
        return null;
    }
}

// --- Update UI Live Rates ---
async function updateExchangeRate(sourceCode, targetCode) {
    if (sourceCode === targetCode) {
        const uiExchangeText = document.querySelector('.exchange-rate');
        if (uiExchangeText) uiExchangeText.textContent = `1 ${sourceCode.toLowerCase()} = 1.0000 ${targetCode.toLowerCase()}`;
        return;
    }

    const liveRates = await fetchLatestRates(sourceCode);
    
    if (liveRates && Array.isArray(liveRates)) {
        const match = liveRates.find(item => item.quote === targetCode);
        const uiExchangeText = document.querySelector('.exchange-rate');
        
        if (match && uiExchangeText) {
            uiExchangeText.textContent = `1 ${sourceCode.toLowerCase()} = ${match.rate.toFixed(5)} ${targetCode.toLowerCase()}`;
        }
    }
}

// --- Render Currency Picker ---
function populateCurrencyPicker() {
    const pickerSections = document.querySelector('.picker-sections');
    if (!pickerSections) return;
    
    const popularList = currencies.filter(c => c.popular);
    const otherList = currencies.filter(c => !c.popular);

    pickerSections.innerHTML = `
        <section class="picker-group">
            <h3>Popular <span class="count">${popularList.length}</span></h3>
            <ul class="currency-list" id="popular-container" role="listbox">
                ${popularList.map(c => createRowHtml(c)).join('')}
            </ul>
        </section>

        <section class="picker-group">
            <h3>Other currencies <span class="count">${otherList.length}</span></h3>
            <ul class="currency-list" id="other-container" role="listbox">
                ${otherList.map(c => createRowHtml(c)).join('')}
            </ul>
        </section>
    `;
}

// --- Filter Search Initialization ---
function setupPickerSearch() {
    const searchInput = document.getElementById('currency-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const currencyRows = document.querySelectorAll('.currency-row');

        currencyRows.forEach(row => {
            const code = row.getAttribute('data-code').toLowerCase();
            const name = row.querySelector('.name').textContent.toLowerCase();

            if (code.includes(query) || name.includes(query)) {
                row.style.display = ''; 
            } else {
                row.style.display = 'none'; 
            }
        });

        const groups = document.querySelectorAll('.picker-group');
        groups.forEach(group => {
            const totalRows = group.querySelectorAll('.currency-row');
            const hiddenRows = group.querySelectorAll('.currency-row[style*="display: none"]');
            
            if (totalRows.length === hiddenRows.length) {
                group.style.display = 'none';
            } else {
                group.style.display = '';
            }
        });
    });
}

setupPickerSearch();

// --- Build Row Item Template ---
function createRowHtml(currency) {
    return `
        <li class="currency-row" role="option" data-code="${currency.code}">
            <img src="${currency.flag}" alt="${currency.name} flag" class="flag">
            <span class="code">${currency.code}</span>
            <span class="name">${currency.name}</span>
            <span class="checkmark" aria-hidden="true"><img src="./assets/images/icon-check.svg" alt="checked item icon"></span>
        </li>
    `;
}

populateCurrencyPicker();

// --- Triggers: Click Listener Management ---
triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        activeTriggerButton = btn; 
        
        const searchInput = document.getElementById('currency-search');
        if (searchInput) {
            searchInput.value = '';
            document.querySelectorAll('.currency-row, .picker-group').forEach(el => el.style.display = '');
        }

        if (!picker.open) {
            picker.show();
        }

        const formGroup = btn.closest('.form-group');
        const rect = formGroup.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        picker.style.width = `${rect.width}px`; 
        picker.style.left = `${rect.left + scrollX}px`;
        picker.style.top = `${rect.bottom + scrollY + 4}px`; 
    });
});

// --- Picker Selection Processing ---
document.querySelector('.picker-sections').addEventListener('click', async (e) => {
    const row = e.target.closest('.currency-row');
    if (!row || !activeTriggerButton) return;

    const previousSelected = document.querySelector('.currency-row.is-selected');
    if (previousSelected) {
        previousSelected.classList.remove('is-selected');
        previousSelected.setAttribute('aria-selected', 'false');
    }
    // 2. Add selected state to the row that was just clicked
    row.classList.add('is-selected');
    row.setAttribute('aria-selected', 'true');

    const selectedCode = row.getAttribute('data-code');
    const selectedFlagSrc = row.querySelector('.flag').getAttribute('src');

    activeTriggerButton.querySelector('.currency-code').textContent = selectedCode;
    activeTriggerButton.querySelector('.flag').setAttribute('src', selectedFlagSrc);
    activeTriggerButton.querySelector('.flag').setAttribute('alt', `${selectedCode} flag`);

    picker.close();

    const codeBlocks = document.querySelectorAll('.currency-code');

    if(codeBlocks.length >= 2){
        const sourceCurrency = codeBlocks[0].textContent.trim();
        const targetCurrency = codeBlocks[1].textContent.trim();
        
        await updateExchangeRate(sourceCurrency, targetCurrency);
        syncChartHeadings(sourceCurrency, targetCurrency);
    }
    calculateForex();
    updateForexChart();
});

// --- Backdrop Click Dismissal ---
document.addEventListener('click', (e) => {
    if (picker.open && !picker.contains(e.target)) {
        picker.close();
    }
});

// --- Swap Currencies ---
document.querySelector('.swap-currencies-btn').addEventListener('click', (event) => {
    event.preventDefault();

    const sendBtn = document.querySelector('button[aria-label="Select send currency"]');
    const receiveBtn = document.querySelector('button[aria-label="Select receive currency"]');

    if (!sendBtn || !receiveBtn) return;

    const sendImg = sendBtn.querySelector('.flag');
    const sendCode = sendBtn.querySelector('.currency-code');

    const receiveImg = receiveBtn.querySelector('.flag');
    const receiveCode = receiveBtn.querySelector('.currency-code');

    if (!sendImg || !sendCode || !receiveImg || !receiveCode) return;

    // capture codes before DOM mutation so updateExchangeRate gets the right pair
    const tempSrc        = sendImg.src;
    const tempAlt        = sendImg.alt;
    const tempCode       = sendCode.textContent;
    const newSendCode    = receiveCode.textContent.trim();
    const newReceiveCode = tempCode.trim();

    sendImg.src  = receiveImg.src;
    sendImg.alt  = receiveImg.alt;
    sendCode.textContent = receiveCode.textContent;

    receiveImg.src = tempSrc;
    receiveImg.alt = tempAlt;
    receiveCode.textContent = tempCode;

    calculateForex();
    updateExchangeRate(newSendCode, newReceiveCode);
    syncChartHeadings(newSendCode, newReceiveCode);
});

// --- Tab Navigation View Controls ---
const mobileTrigger = document.querySelector('.mobile-dropdown-trigger');
const mobileList = document.querySelector('.mobile-dropdown-list');
const mobileLabel = document.querySelector('.mobile-dropdown-label');
const desktopButtons = document.querySelectorAll('.tablet-tab-dropdown button');

const panels = {
    history: document.getElementById('panel-history'),
    compare: document.getElementById('panel-compare'),
    favorites: document.getElementById('panel-favorites'),
    logs: document.getElementById('panel-log')
};

function switchTab(tabId) {
    Object.keys(panels).forEach(key => {
        if (key === tabId) {
            panels[key].classList.remove('hidden');
        } else {
            panels[key].classList.add('hidden');
        }
    });

    if (mobileLabel) mobileLabel.textContent = tabId;
        document.querySelectorAll('.mobile-dropdown-list li').forEach(li => {
        li.classList.toggle('is-active', li.getAttribute('data-tab') === tabId);
    });

    desktopButtons.forEach(btn => {
        const btnText = btn.textContent.toLowerCase().trim();
        if (btnText.includes(tabId.replace('logs', 'log'))) {
            btn.classList.add('is-active');
        } else {
            btn.classList.remove('is-active');
        }
    });
}

if (mobileTrigger && mobileList) {
    mobileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !mobileList.classList.contains('hidden');
        mobileList.classList.toggle('hidden', isOpen);
        mobileTrigger.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        switchTab(li.getAttribute('data-tab'));
        mobileList.classList.add('hidden');
        mobileTrigger.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (e) => {
        if (!mobileList.contains(e.target) && e.target !== mobileTrigger) {
            mobileList.classList.add('hidden');
            mobileTrigger.setAttribute('aria-expanded', 'false');
        }
    });
}

desktopButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent.toLowerCase().trim();
        
        if (btnText.includes('history')) switchTab('history');
        if (btnText.includes('compare')) switchTab('compare');
        if (btnText.includes('favorites')) switchTab('favorites');
        if (btnText.includes('log')) switchTab('logs');
    });
});

switchTab('history');

// --- Timeframe Controls ---
const timeframeButtons = document.querySelectorAll('.timeFrame button');

timeframeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentActive = button.parentNode.querySelector('[aria-checked="true"]');
        if (currentActive) {
            currentActive.setAttribute('aria-checked', 'false');
        }
        
        button.setAttribute('aria-checked', 'true');
        const selectedTimeframe = button.textContent.trim();
        const { from, to } = calculateTimeFrame();

        updateForexChart();
    });
});

// --- Multi-Currency Comparison Grid ---
async function updateComparePanel(baseAmount, baseCurrencyCode) {
    const listContainer = document.querySelector('.comparison-list');
    const emptyState = document.querySelector('#panel-compare .empty-state');
    const summaryAmount = document.querySelector('#panel-compare .meta-summary .amount');
    const summaryBase = document.querySelector('#panel-compare .meta-summary .base-currency');
    const summaryCount = document.querySelector('#panel-compare .row-count');

    if (!baseAmount || baseAmount <= 0) {
        if (listContainer) listContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    const liveRatesData = await fetchLatestRates(baseCurrencyCode);
    
    if (!liveRatesData || !Array.isArray(liveRatesData)) {
        console.error(`Could not fetch live comparisons for baseline currency: ${baseCurrencyCode}`);
        return;
    }

    const targetSymbols = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];
    const activeDisplaySymbols = targetSymbols.filter(symbol => symbol !== baseCurrencyCode);

    if (summaryAmount) summaryAmount.textContent = Number(baseAmount).toLocaleString(undefined, { minimumFractionDigits: 0 });
    if (summaryBase) summaryBase.textContent = baseCurrencyCode;
    if (summaryCount) summaryCount.textContent = `${activeDisplaySymbols.length} pairs`;

    let htmlPayload = '';

    activeDisplaySymbols.forEach(symbol => {
        const matchPair = liveRatesData.find(item => item.quote === symbol);
        if (!matchPair) return; 

        const liveRate = matchPair.rate;
        const masterMatch = currencies.find(c => c.code === symbol);
        const flagPath = masterMatch ? masterMatch.flag : './assets/images/flags/generic.webp';
        const currencyName = masterMatch ? masterMatch.name : symbol;

        const totalConverted = (baseAmount * liveRate).toFixed(2);
        const localizedTotal = Number(totalConverted).toLocaleString(undefined, { minimumFractionDigits: 2 });

        htmlPayload += `
            <li class="comparison-row">
                <div class="currency-info">
                    <img src="${flagPath}" alt="${currencyName} flag" class="flag">
                    <div class="currency-abbr-name">
                        <span class="code">${symbol}</span>
                        <span class="name">${currencyName}</span>
                    </div>
                </div>
                <div class="conversion-data">
                    <span class="converted-amount">${localizedTotal}</span>
                    <span class="reference-rate">@ ${liveRate.toFixed(4)}</span>
                </div>
                <button type="button" class="pin-row-btn" aria-label="Pin ${symbol} pair" data-code="${symbol}">
                    <img src="./assets/images/icon-star.svg" alt="star outline icon">
                </button>
            </li>
        `;
    });

    if (listContainer) {
        listContainer.innerHTML = htmlPayload;
    }

    if (typeof setupPinRowListeners === 'function') {
        setupPinRowListeners();
    }
}

// --- Row Pin Listeners ---
function setupPinRowListeners() {
    const pinButtons = document.querySelectorAll('.pin-row-btn');
    pinButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetCurrency = btn.getAttribute('data-code');
            console.log(`Pin status requested toggled for: ${targetCurrency}`);
        });
    });
}

// --- Mock Datasets for Favorites ---
let favoritesDataMock = [];

// --- Favorite Status Toggle Sync ---
function syncMainFavoriteButtonState() {
    const favoriteBtn = document.querySelector('.favorite-toggle-btn');
    if (!favoriteBtn) return;

    const codeBlocks = document.querySelectorAll('.currency-code');
    if (codeBlocks.length < 2) return;

    const sourceCode = codeBlocks[0].textContent.trim();
    const targetCode = codeBlocks[1].textContent.trim();

    const isFavorited = favoritesDataMock.some(
        fav => fav.source === sourceCode && fav.target === targetCode
    );

    const unpinnedSpan = favoriteBtn.querySelector('.state-unpinned');
    const pinnedSpan = favoriteBtn.querySelector('.state-pinned');

    if (isFavorited) {
        favoriteBtn.setAttribute('aria-pressed', 'true');
        if (unpinnedSpan) unpinnedSpan.classList.add('hidden');
        if (pinnedSpan) pinnedSpan.classList.remove('hidden');
    } else {
        favoriteBtn.setAttribute('aria-pressed', 'false');
        if (unpinnedSpan) unpinnedSpan.classList.remove('hidden');
        if (pinnedSpan) pinnedSpan.classList.add('hidden');
    }

    favoriteBtn.onclick = () => {
        const currentRateElement = document.querySelector('.exchange-rate');
        let activeRate = 1.0000;

        if (currentRateElement) {
            const parts = currentRateElement.textContent.split('=');
            if (parts.length > 1) {
                activeRate = parseFloat(parts[1]) || 1.0000;
            }
        }

        const existingIndex = favoritesDataMock.findIndex(
            fav => fav.source === sourceCode && fav.target === targetCode
        );

        if (existingIndex > -1) {
            favoritesDataMock.splice(existingIndex, 1);
        } else {
            favoritesDataMock.push({
                source: sourceCode,
                target: targetCode,
                rate: activeRate,
                change: '+0.00',
                direction: 'up'
            });
        }

        syncMainFavoriteButtonState();
        
        if(typeof updateFavoritesPanel === 'function') {
            updateFavoritesPanel();
        }
        if(typeof setupPinRowListeners === 'function') {
            setupPinRowListeners(); 
        }
    };
}

syncMainFavoriteButtonState();

// --- Render Favorites View ---
async function updateFavoritesPanel() {
    const favoritesContainer = document.querySelector('.favorites-list');
    const emptyState = document.querySelector('#panel-favorites .empty-state');
    const favCountBadge = document.querySelector('#panel-favorites .meta-summary .fav-count');
    const favoritesCount = document.querySelectorAll('.favorites-badge');

    if (!favoritesDataMock || favoritesDataMock.length === 0) {
        favoritesContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        if (favCountBadge) favCountBadge.textContent = '0';
        if (favoritesCount) favoritesCount.textContent = '0';
        return;
    }

    emptyState.classList.add('hidden');
    if (favCountBadge) favCountBadge.textContent = favoritesDataMock.length;
    favoritesCount.forEach(el => el.textContent = favoritesDataMock.length);
    // sync number of favoritted data on mobile
    const mobileFavOption = document.querySelector('.mobile-tab-dropdown select option[value="favorites"]');
    if (mobileFavOption) mobileFavOption.textContent = `favorites ${favoritesDataMock.length}`;

    let htmlPayload = '';

    for (let index = 0; index < favoritesDataMock.length; index++) {
        const item = favoritesDataMock[index];
        const liveRatesData = await fetchLatestRates(item.source);
        
        let currentRate = item.rate;
        let changePercent = 0;
        
        if (liveRatesData && liveRatesData.rates && liveRatesData.rates[item.target]) {
            currentRate = liveRatesData.rates[item.target];
            changePercent = ((currentRate - item.rate) / item.rate) * 100;
        }
        
        const isUp = changePercent >= 0;
        const trendIcon = isUp ? '▲' : '▼';
        const trendClass = isUp ? 'status-positive' : 'status-negative';
        
        const displayRate = currentRate >= 100 
            ? currentRate.toLocaleString(undefined, { minimumFractionDigits: 2 }) 
            : currentRate.toFixed(4);

        htmlPayload += `
            <li class="favorites-row" data-index="${index}">
                <span class="pair-direction">
                    ${item.source} 
                    <img src="assets/images/icon-arrow-right.svg" alt="to arrow pointer"> 
                    ${item.target}
                </span>
                <span class="live-rate">${displayRate}</span>
                <span class="change-pct ${trendClass}">${trendIcon} ${Math.abs(changePercent).toFixed(2)}%</span>
                <button type="button" class="unpin-row-btn" aria-label="Unpin ${item.source} to ${item.target} pair">
                    <img src="./assets/images/icon-star-filled.svg" alt="filled star icon">
                </button>
            </li>
        `;
    }

    favoritesContainer.innerHTML = htmlPayload;
    setupUnpinListeners();
}

// --- Favorites Unpin Listeners ---
function setupUnpinListeners() {
    const unpinButtons = document.querySelectorAll('.unpin-row-btn');
    unpinButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rowItem = btn.closest('.favorites-row');
            const targetIndex = parseInt(rowItem.getAttribute('data-index'), 10);
                
            favoritesDataMock.splice(targetIndex, 1);
            updateFavoritesPanel();
        });
    });
}

updateFavoritesPanel();

// --- Mock Datasets for Logs ---
let logsDataMock = [];

// --- Submit & Save Conversion Entry ---
const logConversionBtn = document.querySelector('.log-conversion-btn');
if (logConversionBtn) {
    logConversionBtn.onclick = () => {
        const amountInput = document.querySelector('#send-amount'); 
        const outputField = document.querySelector('#receive-amount'); 
        
        const codeBlocks = document.querySelectorAll('.currency-code');
        if (!amountInput || !outputField || codeBlocks.length < 2) return;

        const sourceAmount = parseFloat(amountInput.value);
        const sourceCode = codeBlocks[0].textContent.trim();
        const targetCode = codeBlocks[1].textContent.trim();

        if (!sourceAmount || sourceAmount <= 0) return;

        const targetAmountText = outputField.textContent.replace(/,/g, '');
        const targetAmount = parseFloat(targetAmountText);

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        const newLogEntry = {
            id: Date.now(),
            fromAmount: sourceAmount,
            fromCode: sourceCode,
            toAmount: targetAmount,
            toCode: targetCode,
            timeLabel: `${timeString} · ${dateString}`,
            datetimeAttr: now.toISOString()
        };

        logsDataMock.unshift(newLogEntry);
        if (logsDataMock.length > 20) logsDataMock.pop();

        updateLogPanel();
        
        const originalText = logConversionBtn.textContent;
        logConversionBtn.textContent = 'saved!';
        setTimeout(() => { logConversionBtn.textContent = originalText; }, 1000);
    };
}

// --- Time Formatting Helper ---
function formatTimeLabel(datetimeAttr) {
    const logDate = new Date(datetimeAttr);
    const now = new Date();
    const diffMs = now - logDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
 
    if (diffMins < 1) return 'NOW';
    if (diffMins < 60) return `${diffMins}M`;
    if (diffHours < 24) return `${diffHours}H`;
    
    // older than 1 day — show as "12 May" or "04 Jul"
    const day = String(logDate.getDate()).padStart(2, '0');
    const month = logDate.toLocaleString('en-US', { month: 'short' });
    return `${day} ${month}`;
}

// --- Render Audit Log Timeline ---
function updateLogPanel() {
    const logsContainer = document.querySelector('.log-timeline-list');
    const emptyState = document.querySelector('#panel-log .empty-state');
    const countBadge = document.querySelector('#panel-log .meta-summary .log-count');
    const logCount = document.querySelectorAll('.logs-badge');
    const clearAllBtn = document.querySelector('.clear-all-btn');

    if (!logsDataMock || logsDataMock.length === 0) {
        logsContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        if (countBadge) countBadge.textContent = '0';
        if (clearAllBtn) clearAllBtn.classList.add('hidden'); 
        if (logCount) logCount.textContent = '0';
        return;
    }

    emptyState.classList.add('hidden');
    if (clearAllBtn) clearAllBtn.classList.remove('hidden');
    if (countBadge) countBadge.textContent = logsDataMock.length;
    // Count of logged pairs
    logCount.forEach(el => el.textContent = logsDataMock.length);
    // sync number of logged data on mobile
    const mobileLogOption = document.querySelector('.mobile-tab-dropdown select option[value="logs"]');
    if (mobileLogOption) mobileLogOption.textContent = `logs ${logsDataMock.length}`;

    let htmlPayload = '';

    logsDataMock.forEach(log => {
        const fmtFrom = Number(log.fromAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });
        const fmtTo = Number(log.toAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });

        const formattedTime = formatTimeLabel(log.datetimeAttr);

        htmlPayload += `
            <li class="log-item-row" data-log-id="${log.id}">
                <div class="log-content-meta">
                    <div class="time-currency-pair">
                        <time class="log-time" datetime="${log.datetimeAttr}">${formattedTime}</time>
                        <div class="pair-tokens">
                            <span class="log-code">${log.fromCode}</span>
                            <img src="assets/images/icon-arrow-right.svg" alt="right arrow" class="log-arrow-icon">
                            <span class="log-code">${log.toCode}</span> 
                        </div>
                    </div>
                    <div class="currency-pair-amount">
                        <span class="log-send-amount">${fmtFrom}</span>
                        <span class="log-receive-amount highlight">${fmtTo}</span>
                    </div>
                </div>
                <button type="button" class="delete-log-row-item" aria-label="Delete log record reference ID entry: ${log.id}">
                    <img src="assets/images/icon-delete.svg" alt="recycle-bin icon">
                </button>
            </li>
        `;
    });

    logsContainer.innerHTML = htmlPayload;
    setupLogListeners();
}

// --- Log Deletion Row Listeners ---
function setupLogListeners() {
    const deleteButtons = document.querySelectorAll('.delete-log-row-item');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rowItem = btn.closest('.log-item-row');
            const logId = parseInt(rowItem.getAttribute('data-log-id'), 10);
            
            logsDataMock = logsDataMock.filter(item => item.id !== logId);
            updateLogPanel();
        });
    });

    const clearAllBtn = document.querySelector('.clear-all-btn');
    if (clearAllBtn) {
        clearAllBtn.onclick = () => {
            logsDataMock = [];
            updateLogPanel();
        };
    }
}

updateLogPanel();

// --- Marquee Ticker Setup ---
async function updateMarqueeTicker(baseCurrencyCode) {
    const marqueeTrack = document.querySelector('.ticker-list'); 
    if (!marqueeTrack) return;

    const liveRates = await fetchLatestRates(baseCurrencyCode);
    if (!liveRates || !Array.isArray(liveRates)) return;

    const tickerSymbols = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];
    const filteredRates = liveRates.filter(item => tickerSymbols.includes(item.quote) && item.quote !== baseCurrencyCode);

    let marqueeHtml = '';
    
    filteredRates.forEach(item => {
        const currentRate = item.rate;
        const charCodeSum = item.quote.charCodeAt(0) + item.quote.charCodeAt(1);
        const dailyShiftFactor = 0.995 + ((charCodeSum % 10) / 1000); 
        
        const openPrice = currentRate * dailyShiftFactor;
        const rawChange = currentRate - openPrice;
        const rawPctChange = (rawChange / openPrice) * 100;

        const isPositive = rawChange >= 0;
        const sign = isPositive ? '+' : '';
        const trendClass = isPositive ? 'status-positive' : 'status-negative';
        
        const arrowImg = isPositive 
            ? `<img src="./assets/images/icon-chevron-down.svg" alt="up trend" class="metric-arrow" style="transform: rotate(180deg);">`
            : `<img src="./assets/images/icon-chevron-down.svg" alt="down trend" class="metric-arrow">`;

        marqueeHtml += `
            <li>
                <span class="ticker-pair">${baseCurrencyCode}/${item.quote}</span> 
                <span class="ticker-rate">${currentRate.toFixed(4)}</span> 
                <span class="ticker-trend ${trendClass}">
                    ${arrowImg}<span>${sign}${rawPctChange.toFixed(2)}%</span>
                </span>
            </li>
        `;
    });

    marqueeTrack.innerHTML = marqueeHtml + marqueeHtml;
}

// --- Central Live Processing Engine ---
async function calculateForex() {
    const inputField = document.getElementById('send-amount');
    const outputField = document.getElementById('receive-amount');
    if (!inputField || !outputField) return;

    const cleanValue = inputField.value.replace(/,/g, '');
    let sourceAmount = parseFloat(cleanValue);

    if (isNaN(sourceAmount) || sourceAmount <= 0) {
        sourceAmount = 0;
        outputField.textContent = '0.00';
    }

    const codeBlocks = document.querySelectorAll('.currency-code');
    if (codeBlocks.length < 2) return;
    const sourceCode = codeBlocks[0].textContent.trim();
    const targetCode = codeBlocks[1].textContent.trim();

    if (sourceAmount === 0) {
        outputField.textContent = '0.00';
    } else if (sourceCode === targetCode) {
        outputField.textContent = sourceAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    } else {
        const liveRates = await fetchLatestRates(sourceCode);
        if (liveRates && Array.isArray(liveRates)) {
            const match = liveRates.find(item => item.quote === targetCode);
            if (match) {
                outputField.textContent = (sourceAmount * match.rate).toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                });
            }
        }
    }

    if (typeof updateComparePanel === 'function') {
        updateComparePanel(sourceAmount, sourceCode);
    }
    if (typeof updateMarqueeTicker === 'function') {
        updateMarqueeTicker(sourceCode);
    }
    if (typeof syncMainFavoriteButtonState === 'function') {
        syncMainFavoriteButtonState();
    }
}

// --- Event Handlers & Initializers ---
const sendAmountInput = document.getElementById('send-amount');

if (sendAmountInput) {
    if (sendAmountInput.value) {
        let baseValue = sendAmountInput.value.replace(/,/g, '');
        if (!isNaN(baseValue) && baseValue !== '') {
            const formatted = new Intl.NumberFormat('en-US').format(Number(baseValue));
            sendAmountInput.value = formatted;
            sendAmountInput.style.width = `${formatted.length}ch`;
        } else {
            sendAmountInput.style.width = `${sendAmountInput.value.length}ch`;
        }
    } else {
        sendAmountInput.style.width = `${sendAmountInput.placeholder.length || 1}ch`;
    }

    sendAmountInput.addEventListener('input', (e) => {
        let rawValue = e.target.value.replace(/,/g, '');
        
        if (!rawValue) {
            e.target.value = '';
            e.target.style.width = `${e.target.placeholder.length || 1}ch`;
            calculateForex(); 
            return;
        }

        const formattedValue = new Intl.NumberFormat('en-US').format(Number(rawValue));
        e.target.value = formattedValue;
        e.target.style.width = `${formattedValue.length}ch`;

        calculateForex();
    });
}

function initDefaultExchangeRate() {
    const codeBlocks = document.querySelectorAll('.currency-code');

    // set default send amount so the converter shows a result on load
    const sendInput = document.getElementById('send-amount');
    if (sendInput && (sendInput.value === '0' || sendInput.value === '')) {
        sendInput.value = '1000';
    }
    
    if (codeBlocks.length >= 2) {
        const defaultSource = codeBlocks[0].textContent.trim();
        const defaultTarget = codeBlocks[1].textContent.trim();
        
        updateExchangeRate(defaultSource, defaultTarget).then(() => {
            syncChartHeadings(defaultSource, defaultTarget);
            calculateForex();
        });

        updateMarqueeTicker(defaultSource);

        if (typeof updateComparePanel === 'function') {
            updateComparePanel(1000, defaultSource);
        }
    } else {
        updateExchangeRate('USD', 'EUR').then(() => calculateForex());
        updateMarqueeTicker('USD');
    }
}

// --- Historical API Time Series Data Fetch ---
async function fetchTimeSeriesRates(baseCurrency, quoteCurrency, startDate, endDate){
    try{
        const response = await fetch(`https://api.frankfurter.dev/v2/rates?from=${startDate}&to=${endDate}&base=${baseCurrency}&quotes=${quoteCurrency}`);
        if(!response.ok) throw new Error('Network rates delivery error.');
        return await response.json();
    } catch(error){
        console.error("Rates time series integration fault:", error);
        return null;
    }
}

// --- Process Custom Time Windows ---
function calculateTimeFrame(){
    const endDate = new Date();
    const activeButton = document.querySelector('.timeFrame button[aria-checked="true"]');
    const selectedTimeFrame = activeButton ? activeButton.textContent.trim() : "1m";
    const startDate = new Date(endDate);

    switch(selectedTimeFrame){
        case "1d":
            startDate.setDate(endDate.getDate() - 1);
            break;
        case "1w":
            startDate.setDate(endDate.getDate() - 7);
            break;
        case "1m":
            startDate.setMonth(endDate.getMonth() - 1);
            break;
        case "3m":
            startDate.setMonth(endDate.getMonth() - 3);
            break;
        case "1y":
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
        case "5y":
            startDate.setFullYear(endDate.getFullYear() - 5);
            break;
    }

    return {
        from: formatDate(startDate),
        to: formatDate(endDate)
    };
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

// --- Chart Context Reference State ---
let forexChartInstance = null;

// --- Chart Rendering Context Controls ---
async function updateForexChart() {
    const canvasElement = document.getElementById('forexChart');
    if (!canvasElement) return;

    const codeBlocks = document.querySelectorAll('.currency-code');
    if (codeBlocks.length < 2) return;
    const base = codeBlocks[0].textContent.trim();
    const target = codeBlocks[1].textContent.trim();

    const { from, to } = calculateTimeFrame();

    if (base === target) {
        if (forexChartInstance) {
            forexChartInstance.destroy();
            forexChartInstance = null;
        }
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        return;
    }

    const apiData = await fetchTimeSeriesRates(base, target, from, to);
    if (!apiData || !Array.isArray(apiData) || apiData.length === 0) return;

    const dates = apiData.map(item => {
        const dateObj = new Date(item.date);
        const activeButton = document.querySelector('.timeFrame button[aria-checked="true"]');
        const timeframe = activeButton ? activeButton.textContent.trim().toLowerCase() : "1m";

        if (timeframe === "1y" || timeframe === "5y") {
            return dateObj.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        } else {
            return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    });

    const rates = apiData.map(item => item.rate);
    updateHistoricalMetrics(apiData);

    if (forexChartInstance) {
        forexChartInstance.destroy();
    }

    const ctx = canvasElement.getContext('2d');
    forexChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: `${base}/${target}`,
                data: rates,
                borderColor: '#cef739',
                backgroundColor: function(context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, '#cef739'); 
                    gradient.addColorStop(1, '#171719');
                    return gradient;
                },
                borderWidth: 2,
                pointRadius: dates.length > 30 ? 0 : 2, 
                tension: 0.2, 
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { 
                    grid: { display: false },
                    ticks: { maxRotation: 0, minRotation: 0, autoSkip: true, maxTicksLimit: 8 }
                },
                y: { 
                    grid: { color: '#2e2e2e', borderColor: 'transparent', borderDash: [5, 5], drawTicks: false },
                    ticks: { precision: 4 },
                    color: '#9d9d9d'
                }
            }
        }
    });
}

// --- Sync Layout Titles & Metrics Labels ---
function syncChartHeadings(base, target, sourceTimestamp = null) {
    const activeCurrencyPair = document.querySelector('.active-pair');
    const timeStamp = document.querySelector('.chart-timestamp');
    const rateTextElement = document.querySelector('.exchange-rate');

    if (activeCurrencyPair) {
        activeCurrencyPair.textContent = `${base}/${target}`;
    }

    if (timeStamp && rateTextElement) {
        const rateParts = rateTextElement.textContent.split('=');
        const visualRate = rateParts[1] ? rateParts[1].trim().split(' ')[0] : '0.0000';
        const rateDate = sourceTimestamp ? new Date(sourceTimestamp) : new Date();
        
        const formattedDate = rateDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'CET' 
        }).toUpperCase().replace(',', '');

        timeStamp.innerHTML = `${visualRate} &middot; ${formattedDate} CET`;
    }
}

// --- Aggregate Calculation Processing ---
function updateHistoricalMetrics(apiData) {
    const targetOpen = document.querySelector('.metric-open');
    const targetLast = document.querySelector('.metric-last');
    const changeEl = document.querySelector('.metric-change');
    const pctEl = document.querySelector('.metric-percentage');

    if (!apiData || !Array.isArray(apiData) || apiData.length === 0) return;

    const openRate = apiData[0].rate;
    const lastRate = apiData[apiData.length - 1].rate;

    const rawChange = lastRate - openRate;
    const rawPctChange = (rawChange / openRate) * 100;

    const formattedOpen = openRate.toFixed(4);
    const formattedLast = lastRate.toFixed(4);
    const sign = rawChange >= 0 ? '+' : '';
    const formattedChange = `${sign}${rawChange.toFixed(4)}`;

    const arrowImg = rawChange >= 0 
        ? `<img src="./assets/images/icon-chevron-down.svg" alt="up chevron" class="metric-arrow">`
        : `<img src="./assets/images/icon-chevron-down.svg" alt="down chevron" class="metric-arrow">`;
        
    const formattedPct = `${arrowImg}<span>${sign}${rawPctChange.toFixed(2)}%</span>`;

    if (targetOpen) targetOpen.textContent = formattedOpen;
    if (targetLast) targetLast.textContent = formattedLast;
    if (changeEl) changeEl.textContent = formattedChange;
    if (pctEl) pctEl.innerHTML = formattedPct;
    
    const statusClass = rawChange >= 0 ? 'status-positive' : 'status-negative';
    
    [changeEl, pctEl].forEach(el => {
        if (el) {
            el.classList.remove('status-positive', 'status-negative');
            el.classList.add(statusClass);
        }
    });
}

// --- Core Runtime Entry Points ---
window.onload = () => {
    initDefaultExchangeRate();
    updateForexChart();
};

setInterval(() => {
    if((logsDataMock && logsDataMock.length > 0)){
        updateLogPanel();
    }
}, 60000);