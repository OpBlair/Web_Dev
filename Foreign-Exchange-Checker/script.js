'use strict';

const picker = document.getElementById('currency-picker');
const triggerBtns = document.querySelectorAll('.currency-select-btn');
const searchInput = document.getElementById('currency-search');
let activeTriggerButton = null; // Keeps track of which button opened the menu

// Currencies and Flags Data 
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

// 1. DOM Renderer Setup
function populateCurrencyPicker(filterText = '') {
    const pickerSections = document.querySelector('.picker-sections');
    if (!pickerSections) return;
    
    const cleanFilterText = filterText.toLowerCase().trim();

    // Match query string natively against either codes or names
    const filteredCurrencies = currencies.filter(c => 
        c.code.toLowerCase().includes(cleanFilterText) || 
        c.name.toLowerCase().includes(cleanFilterText)
    );

    // Render fallback empty view if queries return no matching records
    if (filteredCurrencies.length === 0) {
        pickerSections.innerHTML = `
            <div class="search-empty-state" style="padding: 2.5rem 1rem; text-align: center; color: #888;">
                <p style="margin: 0; font-size: 0.95rem;">No currencies match "${filterText}"</p>
            </div>
        `;
        return;
    }

    const popularList = filteredCurrencies.filter(c => c.popular);
    const otherList = filteredCurrencies.filter(c => !c.popular);

    let htmlPayload = '';

    if (popularList.length > 0) {
        htmlPayload += `
            <section class="picker-group">
                <h3>Popular (<span class="count">[${popularList.length}]</span>)</h3>
                <ul class="currency-list" id="popular-container" role="listbox">
                    ${popularList.map(c => createRowHtml(c)).join('')}
                </ul>
            </section>
        `;
    }

    if (otherList.length > 0) {
        htmlPayload += `
            <section class="picker-group">
                <h3>Other currencies (<span class="count">[${otherList.length}]</span>)</h3>
                <ul class="currency-list" id="other-container" role="listbox">
                    ${otherList.map(c => createRowHtml(c)).join('')}
                </ul>
            </section>
        `;
    }

    pickerSections.innerHTML = htmlPayload;
}

function createRowHtml(currency) {
    return `
        <li class="currency-row" role="option" data-code="${currency.code}">
            <img src="${currency.flag}" alt="${currency.name} flag" class="flag">
            <span class="code">${currency.code}</span>
            <span class="name">${currency.name}</span>
        </li>
    `;
}

// Build list on script parse
populateCurrencyPicker();

// --- SEARCH FUNCTIONALITY ENGINE ---
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        populateCurrencyPicker(e.target.value);
    });
}

function clearSearch() {
    if (searchInput) {
        searchInput.value = '';
        populateCurrencyPicker(''); // Reset DOM rendering pipeline to default configuration
    }
}

// 2. Click Triggers & Position Synchronization Combined
triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        activeTriggerButton = btn; 
        
        // Reset query conditions whenever picker drops down fresh
        clearSearch();

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

// 3. Selection Event Delegation
document.querySelector('.picker-sections').addEventListener('click', (e) => {
    const row = e.target.closest('.currency-row');
    if (!row || !activeTriggerButton) return;

    const selectedCode = row.getAttribute('data-code');
    const selectedFlagSrc = row.querySelector('.flag').getAttribute('src');

    // Update form elements safely
    activeTriggerButton.querySelector('.currency-code').textContent = selectedCode;
    activeTriggerButton.querySelector('.flag').setAttribute('src', selectedFlagSrc);
    activeTriggerButton.querySelector('.flag').setAttribute('alt', `${selectedCode} flag`);

    picker.close();
});

// 4. Click Outside Closer
document.addEventListener('click', (e) => {
    if (picker.open && !picker.contains(e.target)) {
        picker.close();
    }
});

// --- TAB NAVIGATION CONTROLLER ---
const mobileSelect = document.querySelector('.mobile-tab-dropdown select');
const desktopButtons = document.querySelectorAll('.tablet-tab-dropdown button');

const panels = {
    history: document.getElementById('panel-history'),
    compare: document.getElementById('panel-compare'),
    favorites: document.getElementById('panel-favorites'),
    logs: document.getElementById('panel-log')
};

function switchTab(tabId) {
    Object.keys(panels).forEach(key => {
        if (!panels[key]) return;
        if (key === tabId) {
            panels[key].classList.remove('hidden');
        } else {
            panels[key].classList.add('hidden');
        }
    });

    if (mobileSelect) mobileSelect.value = tabId;

    desktopButtons.forEach(btn => {
        const btnText = btn.textContent.toLowerCase().trim();
        if (btnText.includes(tabId.replace('logs', 'log'))) {
            btn.classList.add('is-active');
        } else {
            btn.classList.remove('is-active');
        }
    });
}

if (mobileSelect) {
    mobileSelect.addEventListener('change', (e) => {
        switchTab(e.target.value);
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

// Initialize on page load (Show History default)
switchTab('history');

// --- TIMEFRAME SELECTOR ENGINE ---
const timeframeButtons = document.querySelectorAll('.timeFrame button');

timeframeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentActive = button.parentNode.querySelector('[aria-checked="true"]');
        if (currentActive) {
            currentActive.setAttribute('aria-checked', 'false');
        }
        button.setAttribute('aria-checked', 'true');
        const selectedTimeframe = button.textContent.trim();
        console.log(`Loading metrics pipeline history for range index: ${selectedTimeframe}`);
    });
});

// --- COMPARE PANEL DATA ENGINE ---
const comparisonDataMock = [
    { code: 'EUR', name: 'Euro', flag: './assets/images/flags/eu.webp', rate: 0.8530 },
    { code: 'GBP', name: 'British Pound', flag: './assets/images/flags/gb.webp', rate: 0.7845 },
    { code: 'JPY', name: 'Japanese Yen', flag: './assets/images/flags/jp.webp', rate: 156.42 },
    { code: 'AUD', name: 'Australian Dollar', flag: './assets/images/flags/au.webp', rate: 1.5120 },
    { code: 'CAD', name: 'Canadian Dollar', flag: './assets/images/flags/ca.webp', rate: 1.3650 },
    { code: 'CHF', name: 'Swiss Franc', flag: './assets/images/flags/ch.webp', rate: 0.8910 }
];

function updateComparePanel(baseAmount, baseCurrencyCode) {
    const listContainer = document.querySelector('.comparison-list');
    const emptyState = document.querySelector('#panel-compare .empty-state');
    const summaryAmount = document.querySelector('#panel-compare .meta-summary .amount');
    const summaryBase = document.querySelector('#panel-compare .meta-summary .base-currency');
    const summaryCount = document.querySelector('#panel-compare .row-count');

    if (!listContainer) return;

    if (!baseAmount || baseAmount <= 0) {
        listContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    if (summaryAmount) summaryAmount.textContent = Number(baseAmount).toLocaleString(undefined, { minimumFractionDigits: 0 });
    if (summaryBase) summaryBase.textContent = baseCurrencyCode;
    if (summaryCount) summaryCount.textContent = `${comparisonDataMock.length} pairs`;

    let htmlPayload = '';
    comparisonDataMock.forEach(item => {
        const totalConverted = (baseAmount * item.rate).toFixed(2);
        const localizedTotal = Number(totalConverted).toLocaleString(undefined, { minimumFractionDigits: 2 });

        htmlPayload += `
            <li class="comparison-row">
                <div class="currency-info">
                    <img src="${item.flag}" alt="${item.name} flag" class="flag">
                    <span class="code">${item.code}</span>
                    <span class="name">${item.name}</span>
                </div>
                <div class="conversion-data">
                    <span class="converted-amount">${localizedTotal}</span>
                    <span class="reference-rate">@ ${item.rate.toFixed(4)}</span>
                </div>
                <button type="button" class="pin-row-btn" aria-label="Pin ${item.code} pair" data-code="${item.code}">
                    <img src="./assets/images/icon-star.svg" alt="star outline icon">
                </button>
            </li>
        `;
    });

    listContainer.innerHTML = htmlPayload;
    setupPinRowListeners();
}

function setupPinRowListeners() {
    const pinButtons = document.querySelectorAll('.pin-row-btn');
    pinButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCurrency = btn.getAttribute('data-code');
            console.log(`Pin status requested toggled for: ${targetCurrency}`);
        });
    });
}

updateComparePanel(1000, 'USD');

// --- FAVORITES PANEL DATA ENGINE ---
let favoritesDataMock = [
    { source: 'USD', target: 'EUR', rate: 0.8530, change: '+0.24', direction: 'up' },
    { source: 'EUR', target: 'GBP', rate: 0.8841, change: '-0.12', direction: 'down' }
];

function updateFavoritesPanel() {
    const favoritesContainer = document.querySelector('.favorites-list');
    const emptyState = document.querySelector('#panel-favorites .empty-state');
    const favCountBadge = document.querySelector('#panel-favorites .meta-summary .fav-count');

    if (!favoritesContainer) return;

    if (!favoritesDataMock || favoritesDataMock.length === 0) {
        favoritesContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (favCountBadge) favCountBadge.textContent = '0';
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (favCountBadge) favCountBadge.textContent = favoritesDataMock.length;

    let htmlPayload = '';
    favoritesDataMock.forEach((item, index) => {
        const isUp = item.direction === 'up';
        const trendIcon = isUp ? '▲' : '▼';
        const trendClass = isUp ? 'status-positive' : 'status-negative';
        const displayRate = item.rate >= 100 ? item.rate.toLocaleString() : item.rate.toFixed(4);

        htmlPayload += `
            <li class="favorites-row" data-index="${index}">
                <span class="pair-direction">
                    ${item.source} 
                    <img src="assets/images/icon-arrow-right.svg" alt="to arrow pointer"> 
                    ${item.target}
                </span>
                <span class="live-rate">${displayRate}</span>
                <span class="change-pct ${trendClass}">${trendIcon} ${Math.abs(parseFloat(item.change))}%</span>
                <button type="button" class="unpin-row-btn" aria-label="Unpin pair">
                    <img src="./assets/images/icon-star-filled.svg" alt="filled star icon">
                </button>
            </li>
        `;
    });

    favoritesContainer.innerHTML = htmlPayload;
    setupUnpinListeners();
}

function setupUnpinListeners() {
    const unpinButtons = document.querySelectorAll('.unpin-row-btn');
    unpinButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rowItem = btn.closest('.favorites-row');
            const targetIndex = parseInt(rowItem.getAttribute('data-index'), 10);
            favoritesDataMock.splice(targetIndex, 1);
            updateFavoritesPanel();
        });
    });
}

updateFavoritesPanel();

// --- CONVERSION HISTORICAL LOG ENGINE ---
let logsDataMock = [
    { id: 101, fromAmount: 1000, fromCode: 'USD', toAmount: 853.00, toCode: 'EUR', timeLabel: '20m', datetimeAttr: 'PT20M' }
];

function updateLogPanel() {
    const logsContainer = document.querySelector('.log-timeline-list');
    const emptyState = document.querySelector('#panel-log .empty-state');
    const countBadge = document.querySelector('#panel-log .meta-summary .log-count');
    const clearAllBtn = document.querySelector('.clear-all-btn');

    if (!logsContainer) return;

    if (!logsDataMock || logsDataMock.length === 0) {
        logsContainer.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (countBadge) countBadge.textContent = '0';
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (countBadge) countBadge.textContent = logsDataMock.length;

    let htmlPayload = '';
    logsDataMock.forEach(log => {
        const fmtFrom = Number(log.fromAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });
        const fmtTo = Number(log.toAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });

        htmlPayload += `
            <li class="log-row" data-log-id="${log.id}">
                <time class="log-time" datetime="${log.datetimeAttr}">${log.timeLabel}</time>
                <span class="log-pair">${log.fromCode}/${log.toCode}</span>
                <span class="log-send">${fmtFrom} ${log.fromCode}</span>
                <span class="log-arrow"><img src="assets/images/icon-arrow-right.svg" alt="right arrow"></span>
                <span class="log-receive">${fmtTo} ${log.toCode}</span>
                <button type="button" class="delete-log-item" aria-label="Delete entry">
                    <img src="assets/images/icon-delete.svg" alt="recycle-bin icon">
                </button>
            </li>
        `;
    });

    logsContainer.innerHTML = htmlPayload;
    setupLogListeners();
}

function setupLogListeners() {
    const deleteButtons = document.querySelectorAll('.delete-log-item');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const rowItem = btn.closest('.log-row');
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

// --- LIVE MARKETS TICKER ENGINE ---
function initializeLiveTicker() {
    const tickerList = document.querySelector('.ticker-list');
    if (!tickerList) return;

    // 1. Mock Live feeds array data schema
    const liveMarketsMock = [
        { pair: 'EUR/USD', rate: '1.0912', change: '+0.12', direction: 'up' },
        { pair: 'GBP/USD', rate: '1.2734', change: '-0.05', direction: 'down' },
        { pair: 'USD/JPY', rate: '156.82', change: '+0.45', direction: 'up' },
        { pair: 'AUD/USD', rate: '0.6641', change: '-0.18', direction: 'down' },
        { pair: 'USD/CAD', rate: '1.3620', change: '+0.02', direction: 'up' }
    ];

    // 2. Generate the base list items
    const baseHtml = liveMarketsMock.map(item => {
        const isUp = item.direction === 'up';
        const trendIcon = isUp ? '▲' : '▼';
        const trendClass = isUp ? 'trend up' : 'trend down';
        return `<li>${item.pair} ${item.rate} <span class="${trendClass}">${trendIcon} ${Math.abs(parseFloat(item.change))}%</span></li>`;
    }).join('');

    tickerList.innerHTML = baseHtml + baseHtml;
}

initializeLiveTicker();