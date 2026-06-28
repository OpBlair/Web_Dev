'use strict';

const picker = document.getElementById('currency-picker');
const triggerBtns = document.querySelectorAll('.currency-select-btn');
let activeTriggerButton = null;

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

// --- LIVE FOREX RATES API ENGINE ---
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

// DOM Renderer Setup
function populateCurrencyPicker() {
    const pickerSections = document.querySelector('.picker-sections');
    if (!pickerSections) return;
    
    const popularList = currencies.filter(c => c.popular);
    const otherList = currencies.filter(c => !c.popular);

    pickerSections.innerHTML = `
        <section class="picker-group">
            <h3>Popular (<span class="count">[${popularList.length}]</span>)</h3>
            <ul class="currency-list" id="popular-container" role="listbox">
                ${popularList.map(c => createRowHtml(c)).join('')}
            </ul>
        </section>

        <section class="picker-group">
            <h3>Other currencies (<span class="count">[${otherList.length}]</span>)</h3>
            <ul class="currency-list" id="other-container" role="listbox">
                ${otherList.map(c => createRowHtml(c)).join('')}
            </ul>
        </section>
    `;
}

// --- CURRENCY PICKER FILTER SEARCH ENGINE ---
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

function createRowHtml(currency) {
    return `
        <li class="currency-row" role="option" data-code="${currency.code}">
            <img src="${currency.flag}" alt="${currency.name} flag" class="flag">
            <span class="code">${currency.code}</span>
            <span class="name">${currency.name}</span>
        </li>
    `;
}

populateCurrencyPicker();

triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        activeTriggerButton = btn; 
        
        // Clear previous search terms
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

document.querySelector('.picker-sections').addEventListener('click', async (e) => {
    const row = e.target.closest('.currency-row');
    if (!row || !activeTriggerButton) return;

    const selectedCode = row.getAttribute('data-code');
    const selectedFlagSrc = row.querySelector('.flag').getAttribute('src');

    activeTriggerButton.querySelector('.currency-code').textContent = selectedCode;
    activeTriggerButton.querySelector('.flag').setAttribute('src', selectedFlagSrc);
    activeTriggerButton.querySelector('.flag').setAttribute('alt', `${selectedCode} flag`);

    picker.close();

    const codeBlocks = document.querySelectorAll('.currency-code');
    if(codeBlocks.length >= 2){
        const sourceCurrency = codeBlocks[0].textContent.trim();
        const tartgetCurrency = codeBlocks[1].textContent.trim();
        
        await updateExchangeRate(sourceCurrency, tartgetCurrency);
    }
    calculateForex();
});

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

// Event Listener for Mobile Select Dropdown
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

/**
 * Renders and updates the multi-currency comparison panel grid
 * @param {number} baseAmount - The numeric input value from the user (e.g., 1000)
 * @param {string} baseCurrencyCode - The active 3-letter source currency (e.g., "USD")
 */
function updateComparePanel(baseAmount, baseCurrencyCode) {
    const listContainer = document.querySelector('.comparison-list');
    const emptyState = document.querySelector('#panel-compare .empty-state');
    const summaryAmount = document.querySelector('#panel-compare .meta-summary .amount');
    const summaryBase = document.querySelector('#panel-compare .meta-summary .base-currency');
    const summaryCount = document.querySelector('#panel-compare .meta-summary .row-count');

    if (!baseAmount || baseAmount <= 0) {
        listContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

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
        btn.addEventListener('click', (e) => {
            const targetCurrency = btn.getAttribute('data-code');
            console.log(`Pin status requested toggled for: ${targetCurrency}`);
        });
    });
}

// --- FAVORITES PANEL DATA ENGINE ---

let favoritesDataMock = [
    { source: 'USD', target: 'EUR', rate: 0.8530, change: '+0.24', direction: 'up' },
    { source: 'EUR', target: 'GBP', rate: 0.8841, change: '-0.12', direction: 'down' },
    { source: 'BTC', target: 'USD', rate: 64250.00, change: '+4.19', direction: 'up' }
];

function updateFavoritesPanel() {
    const favoritesContainer = document.querySelector('.favorites-list');
    const emptyState = document.querySelector('#panel-favorites .empty-state');
    const favCountBadge = document.querySelector('#panel-favorites .meta-summary .fav-count');

    if (!favoritesDataMock || favoritesDataMock.length === 0) {
        favoritesContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        if (favCountBadge) favCountBadge.textContent = '0';
        return;
    }

    emptyState.classList.add('hidden');

    if (favCountBadge) favCountBadge.textContent = favoritesDataMock.length;

    let htmlPayload = '';

    favoritesDataMock.forEach((item, index) => {
        const isUp = item.direction === 'up';
        const trendIcon = isUp ? '▲' : '▼';
        const trendClass = isUp ? 'status-positive' : 'status-negative';
        
        const displayRate = item.rate >= 100 
            ? item.rate.toLocaleString(undefined, { minimumFractionDigits: 2 }) 
            : item.rate.toFixed(4);

        htmlPayload += `
            <li class="favorites-row" data-index="${index}">
                <span class="pair-direction">
                    ${item.source} 
                    <img src="assets/images/icon-arrow-right.svg" alt="to arrow pointer"> 
                    ${item.target}
                </span>
                <span class="live-rate">${displayRate}</span>
                <span class="change-pct ${trendClass}">${trendIcon} ${Math.abs(item.change)}%</span>
                <button type="button" class="unpin-row-btn" aria-label="Unpin ${item.source} to ${item.target} pair">
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
        btn.addEventListener('click', (e) => {
            const rowItem = btn.closest('.favorites-row');
            const targetIndex = parseInt(rowItem.getAttribute('data-index'), 10);
            
            console.log(`Removing item index target from favorites array stack: ${targetIndex}`);
            
            favoritesDataMock.splice(targetIndex, 1);
            
            updateFavoritesPanel();
        });
    });
}

updateFavoritesPanel();

// --- CONVERSION HISTORICAL LOG ENGINE ---

let logsDataMock = [
    { id: 101, fromAmount: 1000, fromCode: 'USD', toAmount: 853.00, toCode: 'EUR', timeLabel: '14:32 · Jun 26' },
    { id: 102, fromAmount: 250, fromCode: 'GBP', toAmount: 318.50, toCode: 'USD', timeLabel: '11:15 · Jun 25' },
    { id: 103, fromAmount: 50000, fromCode: 'JPY', toAmount: 284.12, toCode: 'CHF', timeLabel: '09:04 · Jun 24' }
];

function updateLogPanel() {
    const logsContainer = document.querySelector('.log-timeline-list');
    const emptyState = document.querySelector('#panel-log .empty-state');
    const countBadge = document.querySelector('#panel-log .meta-summary .log-count');
    const clearAllBtn = document.querySelector('.clear-all-log-btn');

    if (!logsDataMock || logsDataMock.length === 0) {
        logsContainer.innerHTML = '';
        emptyState.classList.remove('hidden');
        if (countBadge) countBadge.textContent = '0';
        if (clearAllBtn) clearAllBtn.classList.add('hidden'); 
        return;
    }

    emptyState.classList.add('hidden');
    if (clearAllBtn) clearAllBtn.classList.remove('hidden');
    if (countBadge) countBadge.textContent = logsDataMock.length;

    let htmlPayload = '';

    logsDataMock.forEach(log => {
        const fmtFrom = Number(log.fromAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });
        const fmtTo = Number(log.toAmount).toLocaleString(undefined, { minimumFractionDigits: 2 });

        htmlPayload += `
            <li class="log-item-row" data-log-id="${log.id}">
                <div class="log-content-meta">
                    <div class="time-currency-pair">
                        <time class="log-time" datetime="${log.datetimeAttr}">${log.timeLabel}</time>
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

    const clearAllBtn = document.querySelector('.clear-all-log-btn');
    if (clearAllBtn) {
        clearAllBtn.onclick = () => {
            logsDataMock = [];
            updateLogPanel();
        };
    }
}

updateLogPanel();

// --- DYNAMIC MARQUEE ENGINE ---
async function updateMarqueeTicker(baseCurrencyCode) {
    const marqueeTrack = document.querySelector('.ticker-list'); 
    if (!marqueeTrack) return;

    const liveRates = await fetchLatestRates(baseCurrencyCode);
    if (!liveRates || !Array.isArray(liveRates)) return;

    const tickerSymbols = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];
    const filteredRates = liveRates.filter(item => tickerSymbols.includes(item.quote) && item.quote !== baseCurrencyCode);

    let marqueeHtml = '';
    
    filteredRates.forEach(item => {
        marqueeHtml += `
            <li>${baseCurrencyCode}/${item.quote} ${item.rate.toFixed(4)} <span class="trend up">▲ 0.12%</span></li>
        `;
    });

    marqueeTrack.innerHTML = marqueeHtml + marqueeHtml;
}

// --- CORE CALCULATION ENGINE ---
// --- CENTRAL CALCULATOR AND PANEL DISPATCHER ---
async function calculateForex() {
    const inputField = document.getElementById('send-amount');
    const outputField = document.getElementById('receive-amount');
    if (!inputField || !outputField) return;

    let sourceAmount = parseFloat(inputField.value);

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
        outputField.textContent = sourceAmount.toFixed(2);
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
}

// --- EVENT LISTENER REGISTRATION VIA DISPATCHER ---
const sendAmountInput = document.getElementById('send-amount');
if (sendAmountInput) {
    sendAmountInput.addEventListener('input', calculateForex);
}

function initDefaultExchangeRate() {
    const codeBlocks = document.querySelectorAll('.currency-code');
    
    if (codeBlocks.length >= 2) {
        const defaultSource = codeBlocks[0].textContent.trim();
        const defaultTarget = codeBlocks[1].textContent.trim();
        
        updateExchangeRate(defaultSource, defaultTarget);
        updateMarqueeTicker(defaultSource);
    } else {
        updateExchangeRate('USD', 'EUR');
        updateMarqueeTicker('USD');
    }
}

initDefaultExchangeRate();
