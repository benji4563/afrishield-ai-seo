// ==========================================================================
// AfriShield AI SEO — Interactive Content Board & Instagram Meme Studio
// Application Logic & State Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Ensure data is loaded
  const data = window.AFRISHIELD_DATA;
  if (!data || !data.days) {
    console.error("AfriShield Content Data not found!");
    return;
  }

  // Load custom statuses from localStorage
  const savedStatuses = JSON.parse(localStorage.getItem('afrishield_post_statuses') || '{}');
  data.days.forEach(d => {
    if (savedStatuses[d.id]) {
      d.status = savedStatuses[d.id];
    }
  });

  // Application State
  const state = {
    currentView: 'kanban',
    selectedMonth: 1, // 1-6 or null for all
    filters: {
      search: '',
      pillar: 'ALL',
      series: 'ALL',
      industry: 'ALL',
      status: 'ALL'
    },
    selectedDay: null,
    activePlatformTab: 'tiktok',
    currentMeme: data.instagramMemes[0] ? { ...data.instagramMemes[0] } : null,
    memeRatio: '1:1',
    memeTheme: 'dark-emerald'
  };

  // DOM Elements
  const viewNav = document.getElementById('viewNav');
  const viewKanban = document.getElementById('viewKanban');
  const viewCalendar = document.getElementById('viewCalendar');
  const viewTable = document.getElementById('viewTable');
  const viewMemes = document.getElementById('viewMemes');
  const viewStrategy = document.getElementById('viewStrategy');
  const viewAnalytics = document.getElementById('viewAnalytics');
  const viewFreestyle = document.getElementById('viewFreestyle');
  const globalControlBar = document.getElementById('globalControlBar');
  const resultsMetaBar = document.getElementById('resultsMetaBar');

  const monthTabsContainer = document.getElementById('monthTabsContainer');
  const searchInput = document.getElementById('searchInput');
  const pillarFilter = document.getElementById('pillarFilter');
  const seriesFilter = document.getElementById('seriesFilter');
  const industryFilter = document.getElementById('industryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const btnResetFilters = document.getElementById('btnResetFilters');
  const btnExportData = document.getElementById('btnExportData');

  const totalDaysCount = document.getElementById('totalDaysCount');
  const activeFilterCount = document.getElementById('activeFilterCount');
  const visibleDaysCount = document.getElementById('visibleDaysCount');
  const publishedCount = document.getElementById('publishedCount');

  // Modal elements
  const teleprompterModal = document.getElementById('teleprompterModal');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const modalDayNumber = document.getElementById('modalDayNumber');
  const modalSeriesTag = document.getElementById('modalSeriesTag');
  const modalPillarTag = document.getElementById('modalPillarTag');
  const modalIndustryTag = document.getElementById('modalIndustryTag');
  const modalDateString = document.getElementById('modalDateString');
  const modalStatusSelect = document.getElementById('modalStatusSelect');
  const modalHookText = document.getElementById('modalHookText');
  const modalTimingHook = document.getElementById('modalTimingHook');
  const modalTimingReceipt = document.getElementById('modalTimingReceipt');
  const modalTimingFix = document.getElementById('modalTimingFix');
  const modalTimingCTA = document.getElementById('modalTimingCTA');
  const modalPlatformCopyBox = document.getElementById('modalPlatformCopyBox');
  const drawerPlatformTabs = document.getElementById('drawerPlatformTabs');
  const btnCopyActivePlatform = document.getElementById('btnCopyActivePlatform');
  const modalKeywords = document.getElementById('modalKeywords');
  const modalHashtags = document.getElementById('modalHashtags');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  // Meme Elements
  const memePresetsGrid = document.getElementById('memePresetsGrid');
  const memeFormatSelect = document.getElementById('memeFormatSelect');
  const memeThemeSelect = document.getElementById('memeThemeSelect');
  const memeTopText = document.getElementById('memeTopText');
  const memeBottomText = document.getElementById('memeBottomText');
  const memePunchline = document.getElementById('memePunchline');
  const memeAuthor = document.getElementById('memeAuthor');
  const memeWatermark = document.getElementById('memeWatermark');
  const memeCanvas = document.getElementById('memeCanvas');
  const ratioBtnGroup = document.getElementById('ratioBtnGroup');
  const btnDownloadMeme = document.getElementById('btnDownloadMeme');
  const btnCopyMemeCaption = document.getElementById('btnCopyMemeCaption');
  const memeCaptionText = document.getElementById('memeCaptionText');

  // Show Toast
  function showToast(msg, icon = '✅') {
    document.getElementById('toastIcon').textContent = icon;
    toastMessage.textContent = msg;
    toastNotification.classList.add('active');
    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 2800);
  }

  // Update Status in localStorage
  function updateDayStatus(dayId, newStatus) {
    const day = data.days.find(d => d.id === dayId);
    if (day) {
      day.status = newStatus;
      savedStatuses[dayId] = newStatus;
      localStorage.setItem('afrishield_post_statuses', JSON.stringify(savedStatuses));
      renderCurrentView();
      updateHeaderKPIs();
      showToast(`Status updated to "${newStatus}" for ${day.dayString}`);
    }
  }

  // Update Top Stats
  function updateHeaderKPIs() {
    totalDaysCount.textContent = data.days.length;
    const filtered = getFilteredDays();
    activeFilterCount.textContent = filtered.length;
    visibleDaysCount.textContent = filtered.length;
    const pubCount = data.days.filter(d => d.status === 'Published').length;
    publishedCount.textContent = pubCount;
  }

  // Filter Algorithm
  function getFilteredDays() {
    return data.days.filter(day => {
      // Month Filter
      if (state.selectedMonth !== null && day.monthNumber !== state.selectedMonth) {
        return false;
      }
      // Pillar Filter
      if (state.filters.pillar !== 'ALL' && day.contentPillar !== state.filters.pillar) {
        return false;
      }
      // Series Filter
      if (state.filters.series !== 'ALL' && day.contentSeries !== state.filters.series) {
        return false;
      }
      // Industry Filter
      if (state.filters.industry !== 'ALL' && day.industry !== state.filters.industry) {
        return false;
      }
      // Status Filter
      if (state.filters.status !== 'ALL' && day.status !== state.filters.status) {
        return false;
      }
      // Search Query Filter
      if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        const searchable = [
          day.dayString,
          day.hook,
          day.mainTopic,
          day.keyLesson,
          day.storyAngle,
          day.videoIdea,
          day.caption,
          day.seoKeywords,
          day.hashtags,
          day.contentSeries,
          day.niche,
          day.platforms.tiktok,
          day.platforms.linkedIn
        ].join(' ').toLowerCase();
        if (!searchable.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }

  // Populate Recurring Series Dropdown
  function populateSeriesDropdown() {
    const seriesSet = new Set();
    data.days.forEach(d => {
      if (d.contentSeries && d.contentSeries !== 'General') {
        seriesSet.add(d.contentSeries);
      }
    });
    const sortedSeries = Array.from(seriesSet).sort();
    sortedSeries.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      seriesFilter.appendChild(opt);
    });
  }

  // Render Month Tabs Carousel
  function renderMonthTabs() {
    monthTabsContainer.innerHTML = '';

    // "All Months" Tab
    const allTab = document.createElement('div');
    allTab.className = `month-tab-card ${state.selectedMonth === null ? 'active' : ''}`;
    allTab.innerHTML = `
      <div class="month-tab-header">
        <span class="month-num" style="color: var(--emerald);">ALL MONTHS</span>
        <span class="month-days-count">180 Days</span>
      </div>
      <div class="month-tab-title">Complete 6-Month AI SEO &amp; GEO Calendar</div>
    `;
    allTab.addEventListener('click', () => {
      state.selectedMonth = null;
      renderMonthTabs();
      renderCurrentView();
      updateHeaderKPIs();
    });
    monthTabsContainer.appendChild(allTab);

    // Months 1 to 6
    for (let m = 1; m <= 6; m++) {
      const info = data.monthThemes[m];
      const count = data.days.filter(d => d.monthNumber === m).length;
      const card = document.createElement('div');
      card.className = `month-tab-card m${m} ${state.selectedMonth === m ? 'active' : ''}`;
      card.innerHTML = `
        <div class="month-tab-header">
          <span class="month-num" style="color: ${info.color}">MONTH ${m}</span>
          <span class="month-days-count">${count} Days</span>
        </div>
        <div class="month-tab-title">${info.theme}</div>
      `;
      card.addEventListener('click', () => {
        state.selectedMonth = m;
        renderMonthTabs();
        renderCurrentView();
        updateHeaderKPIs();
      });
      monthTabsContainer.appendChild(card);
    }
  }

  // =========================================================================
  // VIEW RENDERING: KANBAN
  // =========================================================================
  function renderKanban() {
    const container = document.getElementById('kanbanBoardContainer');
    container.innerHTML = '';
    const filteredDays = getFilteredDays();

    const columns = [
      { key: 'Not Started', label: 'Not Started / Idea', class: 'not-started', dot: 'not-started' },
      { key: 'Scripted', label: 'Scripted & Ready', class: 'scripted', dot: 'scripted' },
      { key: 'Filmed', label: 'Filmed (B-Roll/A-Roll)', class: 'filmed', dot: 'filmed' },
      { key: 'Edited', label: 'Edited & Packaged', class: 'edited', dot: 'edited' },
      { key: 'Scheduled', label: 'Scheduled', class: 'scheduled', dot: 'scheduled' },
      { key: 'Published', label: 'Published & Live', class: 'published', dot: 'published' }
    ];

    columns.forEach(col => {
      const colDays = filteredDays.filter(d => d.status === col.key);
      const colEl = document.createElement('div');
      colEl.className = 'kanban-column';
      colEl.innerHTML = `
        <div class="kanban-column-header">
          <div class="column-title-group">
            <div class="column-dot ${col.dot}"></div>
            <div class="column-title">${col.label}</div>
          </div>
          <span class="column-count-badge">${colDays.length}</span>
        </div>
        <div class="kanban-cards-list" id="col-${col.key.replace(/\s+/g, '-')}">
        </div>
      `;

      const listEl = colEl.querySelector('.kanban-cards-list');

      colDays.forEach(day => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
          <div class="card-top-row">
            <span class="card-day-badge">${day.dayString} · ${day.date}</span>
            <span class="card-series-pill">${day.contentSeries}</span>
          </div>
          <div class="card-hook" title="${day.hook}">${day.hook}</div>
          <div class="card-meta-tags">
            <span class="meta-tag pillar">${day.contentPillar}</span>
            <span class="meta-tag">${day.niche || day.industry}</span>
          </div>
          <div class="card-footer-row">
            <div class="platform-icons">
              <span title="TikTok">📱</span>
              <span title="Instagram Reel">📸</span>
              <span title="Facebook Reel">👥</span>
              <span title="LinkedIn">💼</span>
              <span title="YouTube Short">▶️</span>
            </div>
            <span class="card-cta-badge">${day.cta}</span>
          </div>
        `;
        card.addEventListener('click', () => openDayModal(day.id));
        listEl.appendChild(card);
      });

      container.appendChild(colEl);
    });
  }

  // =========================================================================
  // VIEW RENDERING: CALENDAR GRID
  // =========================================================================
  function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthTitle = document.getElementById('calendarMonthTitle');
    const monthSub = document.getElementById('calendarMonthSub');

    const m = state.selectedMonth || 1;
    const info = data.monthThemes[m];
    monthTitle.textContent = info.title;
    monthSub.textContent = `${info.subtitle} · Theme: ${info.theme}`;

    // Clear previous day cells (keep first 7 header cells)
    while (grid.children.length > 7) {
      grid.removeChild(grid.lastChild);
    }

    const monthDays = data.days.filter(d => d.monthNumber === m);
    if (monthDays.length === 0) return;

    // Get weekday offset of first day (0 = Mon, 6 = Sun)
    const firstDate = new Date(monthDays[0].date);
    // Sunday in JS is 0, we want Monday = 0
    let startDayOfWeek = (firstDate.getDay() + 6) % 7;

    // Empty offset cells
    for (let i = 0; i < startDayOfWeek; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-cell empty';
      grid.appendChild(emptyCell);
    }

    // Month Days
    monthDays.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell';
      cell.innerHTML = `
        <div class="cell-top">
          <span class="cell-day-num">${day.dayString.split(' ')[1] || 'Day ' + day.dayNumber}</span>
          <span class="cell-date-str">${day.date.slice(5)}</span>
        </div>
        <div class="cell-series">${day.contentSeries}</div>
        <div class="cell-hook-preview" title="${day.hook}">${day.hook}</div>
        <div class="cell-bottom-pills">
          <span class="meta-tag" style="font-size:0.6rem;">${day.niche ? day.niche.slice(0, 14) : day.industry.slice(0, 14)}</span>
          <span class="table-status-pill status-${day.status.toLowerCase().replace(/\s+/g, '-')}">${day.status}</span>
        </div>
      `;
      cell.addEventListener('click', () => openDayModal(day.id));
      grid.appendChild(cell);
    });
  }

  // Calendar prev/next buttons
  document.getElementById('btnPrevMonth').addEventListener('click', () => {
    if (state.selectedMonth && state.selectedMonth > 1) {
      state.selectedMonth--;
    } else {
      state.selectedMonth = 6;
    }
    renderMonthTabs();
    renderCalendar();
    updateHeaderKPIs();
  });
  document.getElementById('btnNextMonth').addEventListener('click', () => {
    if (state.selectedMonth && state.selectedMonth < 6) {
      state.selectedMonth++;
    } else {
      state.selectedMonth = 1;
    }
    renderMonthTabs();
    renderCalendar();
    updateHeaderKPIs();
  });

  // =========================================================================
  // VIEW RENDERING: DATA MATRIX / TABLE
  // =========================================================================
  function renderTable() {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';
    const filteredDays = getFilteredDays();

    filteredDays.forEach(day => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="table-day-cell">${day.dayString}</td>
        <td style="white-space: nowrap; font-size: 0.75rem;">${day.date}</td>
        <td>
          <div style="font-weight: 600; color: var(--text-primary); font-size: 0.8rem;">${day.industry}</div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">${day.niche || '—'}</div>
        </td>
        <td>
          <div style="color: var(--cyan); font-weight: 600; font-size: 0.8rem;">${day.contentPillar}</div>
          <div style="color: var(--emerald); font-size: 0.75rem; font-weight: 700;">${day.contentSeries}</div>
        </td>
        <td class="table-hook-cell" title="${day.hook}">
          <div style="line-height: 1.35; font-size: 0.85rem;">${day.hook}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.2rem; font-style: italic;">Topic: ${day.mainTopic}</div>
        </td>
        <td><span class="card-cta-badge">${day.cta}</span></td>
        <td>
          <select class="filter-select table-status-dropdown" data-day-id="${day.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
            <option value="Not Started" ${day.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
            <option value="Scripted" ${day.status === 'Scripted' ? 'selected' : ''}>Scripted</option>
            <option value="Filmed" ${day.status === 'Filmed' ? 'selected' : ''}>Filmed</option>
            <option value="Edited" ${day.status === 'Edited' ? 'selected' : ''}>Edited</option>
            <option value="Scheduled" ${day.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
            <option value="Published" ${day.status === 'Published' ? 'selected' : ''}>Published</option>
          </select>
        </td>
        <td>
          <button class="btn-export btn-inspect-row" style="padding: 0.35rem 0.6rem; font-size: 0.75rem;">Inspect</button>
        </td>
      `;

      // Status dropdown inline handler
      const select = tr.querySelector('.table-status-dropdown');
      select.addEventListener('change', (e) => {
        e.stopPropagation();
        updateDayStatus(day.id, e.target.value);
      });
      select.addEventListener('click', (e) => e.stopPropagation());

      // Inspect click
      tr.addEventListener('click', () => openDayModal(day.id));
      tbody.appendChild(tr);
    });
  }

  // =========================================================================
  // VIEW RENDERING: INSTAGRAM MEMES STUDIO & VIRAL LAB
  // =========================================================================
  function renderMemeStudio() {
    memePresetsGrid.innerHTML = '';

    data.instagramMemes.forEach((meme, idx) => {
      const card = document.createElement('div');
      card.className = `meme-preset-card ${state.currentMeme && state.currentMeme.id === meme.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="meme-preset-cat">${meme.category}</div>
        <div class="meme-preset-title">${meme.title}</div>
        <div class="meme-preset-hook">"${meme.hook}"</div>
      `;
      card.addEventListener('click', () => {
        state.currentMeme = { ...meme };
        state.memeTheme = meme.theme || 'dark-emerald';
        loadMemeIntoCustomizer();
        renderMemeStudio(); // refresh active class
        drawMemeCanvas();
      });
      memePresetsGrid.appendChild(card);
    });

    loadMemeIntoCustomizer();
    drawMemeCanvas();
  }

  function loadMemeIntoCustomizer() {
    if (!state.currentMeme) return;
    const m = state.currentMeme;
    memeTopText.value = m.topText || '';
    memeBottomText.value = m.style === 'tweet-card' ? (m.tweetContent || m.bottomText || '') : (m.bottomText || '');
    memePunchline.value = m.punchline || '';
    memeAuthor.value = m.author || 'AfriShield AI SEO';
    memeThemeSelect.value = state.memeTheme || 'dark-emerald';
    memeCaptionText.textContent = `${m.caption}\n\n${m.hashtags}`;
  }

  // HTML5 Canvas Drawing Engine
  function drawMemeCanvas() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1080;
    let height = 1080;

    if (state.memeRatio === '4:5') {
      height = 1350;
    } else if (state.memeRatio === '9:16') {
      height = 1920;
    }

    canvas.width = width;
    canvas.height = height;

    // Theme Color Palettes
    let bgDark = '#090D16';
    let cardBg = '#111827';
    let accent = '#10B981';
    let accentGlow = 'rgba(16, 185, 129, 0.3)';
    let textLight = '#FFFFFF';
    let textMuted = '#94A3B8';

    if (state.memeTheme === 'cyber-cyan') {
      accent = '#06B6D4';
      accentGlow = 'rgba(6, 182, 212, 0.3)';
    } else if (state.memeTheme === 'amber-luxury') {
      accent = '#F59E0B';
      accentGlow = 'rgba(245, 158, 11, 0.3)';
    } else if (state.memeTheme === 'purple-neon') {
      accent = '#8B5CF6';
      accentGlow = 'rgba(139, 92, 246, 0.3)';
    }

    // 1. Background Fill
    ctx.fillStyle = bgDark;
    ctx.fillRect(0, 0, width, height);

    // Subtle Radial Glow behind center
    const radial = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.65);
    radial.addColorStop(0, accentGlow);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // 2. Top Header Brand Bar
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(60, 50, width - 120, 80);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 50, width - 120, 80);

    // Logo Icon Box
    ctx.fillStyle = accent;
    ctx.fillRect(80, 65, 50, 50);
    ctx.fillStyle = '#064E3B';
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText('🛡️', 88, 102);

    // Brand Name & Tagline
    ctx.fillStyle = textLight;
    ctx.font = 'bold 26px Outfit, sans-serif';
    ctx.fillText('AFRISHIELD AI SEO', 150, 95);

    ctx.fillStyle = textMuted;
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(state.currentMeme ? state.currentMeme.category.toUpperCase() : 'MEME LAB', 150, 118);

    // Watermark Top Right
    ctx.fillStyle = accent;
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('afrishieldai.com', width - 90, 98);
    ctx.textAlign = 'left';

    // 3. Top Hook / Situation Box
    const topText = memeTopText.value.trim() || 'LODGE OWNER PAYING $2,500/MO TO BOOKING.COM COMMISSION';
    ctx.fillStyle = textLight;
    ctx.font = '900 36px Outfit, sans-serif';
    wrapText(ctx, topText, 70, 190, width - 140, 48);

    // 4. Middle Content Card (Split or Tweet Card)
    const m = state.currentMeme;
    const cardY = 320;
    const cardH = height - 540;

    // Outer Card Border & Glow
    ctx.fillStyle = cardBg;
    ctx.fillRect(60, cardY, width - 120, cardH);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(60, cardY, width - 120, cardH);

    if (m && m.style === 'split-comparison') {
      // Split Layout: Left vs Right
      const colW = (width - 160) / 2;
      
      // Left Column (Problem)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
      ctx.fillRect(75, cardY + 15, colW - 10, cardH - 30);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.strokeRect(75, cardY + 15, colW - 10, cardH - 30);

      ctx.fillStyle = '#EF4444';
      ctx.font = 'bold 24px Outfit, sans-serif';
      ctx.fillText(m.leftLabel || 'The Old Way', 95, cardY + 60);

      ctx.fillStyle = textLight;
      ctx.font = '22px Inter, sans-serif';
      wrapText(ctx, m.leftContent || 'High OTA commission\nLost customer data', 95, cardY + 110, colW - 40, 36);

      // Right Column (Solution)
      const rightX = 75 + colW + 10;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.fillRect(rightX, cardY + 15, colW - 10, cardH - 30);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
      ctx.strokeRect(rightX, cardY + 15, colW - 10, cardH - 30);

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 24px Outfit, sans-serif';
      ctx.fillText(m.rightLabel || 'AfriShield Direct GEO', rightX + 20, cardY + 60);

      ctx.fillStyle = textLight;
      ctx.font = '22px Inter, sans-serif';
      wrapText(ctx, m.rightContent || '100% direct revenue kept\nCited in ChatGPT', rightX + 20, cardY + 110, colW - 40, 36);

    } else {
      // Tweet Card / Single Body Style
      // Avatar
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(115, cardY + 60, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#064E3B';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('🤖', 100, cardY + 70);

      // Author & Handle
      ctx.fillStyle = textLight;
      ctx.font = 'bold 26px Inter, sans-serif';
      ctx.fillText(memeAuthor.value || 'AfriShield AI SEO', 165, cardY + 52);

      ctx.fillStyle = textMuted;
      ctx.font = '20px Inter, sans-serif';
      ctx.fillText(m && m.handle ? m.handle : '@afrishieldai', 165, cardY + 80);

      // Tweet Body Text
      const bodyText = memeBottomText.value.trim() || 'AI engines can only recommend businesses they can read. If your site blocks crawlers, you are invisible.';
      ctx.fillStyle = textLight;
      ctx.font = '28px Inter, sans-serif';
      wrapText(ctx, bodyText, 100, cardY + 145, width - 200, 44);
    }

    // 5. Bottom Punchline Callout
    const punchline = memePunchline.value.trim() || 'Receipts over promises. Real operators do not hide behind graphs.';
    const punchY = height - 160;

    ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.fillRect(60, punchY, width - 120, 80);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.strokeRect(60, punchY, width - 120, 80);

    ctx.fillStyle = accent;
    ctx.font = '900 24px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`💡 ${punchline}`, width / 2, punchY + 48);
    ctx.textAlign = 'left';

    // 6. Bottom Watermark Bar
    ctx.fillStyle = textMuted;
    ctx.font = '16px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(memeWatermark.value || 'afrishieldai.com · @afrishieldai', width / 2, height - 35);
    ctx.textAlign = 'left';
  }

  // Canvas Text Wrapper Helper
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const paragraphs = text.split('\n');
    let currentY = y;

    paragraphs.forEach(para => {
      const words = para.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
      currentY += lineHeight * 1.1;
    });
  }

  // Meme Customizer Input Handlers
  memeTopText.addEventListener('input', drawMemeCanvas);
  memeBottomText.addEventListener('input', drawMemeCanvas);
  memePunchline.addEventListener('input', drawMemeCanvas);
  memeAuthor.addEventListener('input', drawMemeCanvas);
  memeWatermark.addEventListener('input', drawMemeCanvas);
  memeThemeSelect.addEventListener('change', (e) => {
    state.memeTheme = e.target.value;
    drawMemeCanvas();
  });

  // Format Aspect Ratio Selector
  memeFormatSelect.addEventListener('change', (e) => {
    state.memeRatio = e.target.value;
    updateRatioButtons(state.memeRatio);
    drawMemeCanvas();
  });

  ratioBtnGroup.querySelectorAll('.ratio-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.memeRatio = btn.dataset.ratio;
      memeFormatSelect.value = state.memeRatio;
      updateRatioButtons(state.memeRatio);
      drawMemeCanvas();
    });
  });

  function updateRatioButtons(ratio) {
    ratioBtnGroup.querySelectorAll('.ratio-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.ratio === ratio);
    });
  }

  // Download Meme Button
  btnDownloadMeme.addEventListener('click', () => {
    const canvas = document.getElementById('memeCanvas');
    const link = document.createElement('a');
    const filename = state.currentMeme ? `${state.currentMeme.id}-afrishield-meme.png` : 'afrishield-meme.png';
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast(`Meme downloaded as ${filename}!`);
  });

  // Copy Caption Button
  btnCopyMemeCaption.addEventListener('click', () => {
    const text = memeCaptionText.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast("Instagram caption and hashtags copied to clipboard!");
      const ind = document.getElementById('captionCopiedIndicator');
      ind.style.display = 'inline';
      setTimeout(() => { ind.style.display = 'none'; }, 2500);
    });
  });

  // =========================================================================
  // VIEW RENDERING: STRATEGY & SWIPE FILE
  // =========================================================================
  function renderStrategy() {
    // 4 Loops
    const loopsList = document.getElementById('strategyFourLoopsList');
    loopsList.innerHTML = '';
    data.strategy.brand.fourLoops.forEach(l => {
      const item = document.createElement('div');
      item.className = 'swipe-card';
      item.innerHTML = `
        <div style="font-weight: 800; color: var(--emerald); font-size: 0.95rem;">${l.name}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${l.desc}</div>
      `;
      loopsList.appendChild(item);
    });

    // Niche Priority
    const nichesList = document.getElementById('strategyNichesList');
    nichesList.innerHTML = '';
    data.strategy.brand.nichePriority.forEach(n => {
      const item = document.createElement('div');
      item.className = 'swipe-card';
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <span style="font-weight: 700; color: var(--cyan); font-size: 0.9rem;">${n.tier}: ${n.niche}</span>
          <span class="column-count-badge">${n.share}</span>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary);">${n.pain}</div>
      `;
      nichesList.appendChild(item);
    });

    // Creator Swipe File
    const swipeList = document.getElementById('creatorSwipeFileList');
    swipeList.innerHTML = '';
    data.strategy.creatorSwipeFile.forEach(c => {
      const card = document.createElement('div');
      card.className = 'swipe-card';
      card.innerHTML = `
        <div class="swipe-creator">${c.name} — ${c.platform}</div>
        <div class="swipe-mech"><strong>Mechanic to Clone:</strong> ${c.mechanism}</div>
        <div class="swipe-transform"><strong>AfriShield Transform:</strong> ${c.transform}</div>
      `;
      swipeList.appendChild(card);
    });

    // Humor Rules
    const humorList = document.getElementById('humorRulesList');
    humorList.innerHTML = '';
    data.strategy.humorRules.forEach(h => {
      const item = document.createElement('div');
      item.className = 'swipe-card';
      item.innerHTML = `
        <div style="font-weight: 700; color: var(--amber); font-size: 0.9rem;">${h.rule}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${h.detail}</div>
      `;
      humorList.appendChild(item);
    });
  }

  // =========================================================================
  // VIEW RENDERING: ANALYTICS & KPIS
  // =========================================================================
  function renderAnalytics() {
    // Pillar Distribution
    const pillarContainer = document.getElementById('analyticsPillarStats');
    pillarContainer.innerHTML = '';

    const pillarCounts = {};
    data.days.forEach(d => {
      pillarCounts[d.contentPillar] = (pillarCounts[d.contentPillar] || 0) + 1;
    });

    Object.entries(pillarCounts).sort((a, b) => b[1] - a[1]).forEach(([pillar, count]) => {
      const pct = Math.round((count / data.days.length) * 100);
      const row = document.createElement('div');
      row.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem;">
          <span style="font-weight: 600;">${pillar}</span>
          <span style="color: var(--emerald); font-weight: 700;">${count} days (${pct}%)</span>
        </div>
        <div style="background: var(--bg-secondary); height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="background: var(--emerald); width: ${pct}%; height: 100%;"></div>
        </div>
      `;
      pillarContainer.appendChild(row);
    });

    // CTA Keywords
    const ctaContainer = document.getElementById('analyticsCtaStats');
    ctaContainer.innerHTML = '';

    const ctaCounts = {};
    data.days.forEach(d => {
      const c = d.cta || 'Follow';
      ctaCounts[c] = (ctaCounts[c] || 0) + 1;
    });

    Object.entries(ctaCounts).sort((a, b) => b[1] - a[1]).slice(0, 8).forEach(([cta, count]) => {
      const pct = Math.round((count / data.days.length) * 100);
      const row = document.createElement('div');
      row.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.2rem;">
          <span style="font-weight: 600; color: var(--amber);">${cta}</span>
          <span style="color: var(--text-primary); font-weight: 700;">${count} posts</span>
        </div>
        <div style="background: var(--bg-secondary); height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="background: var(--amber); width: ${Math.min(pct * 3, 100)}%; height: 100%;"></div>
        </div>
      `;
      ctaContainer.appendChild(row);
    });

    // Month Progress
    const monthProgress = document.getElementById('analyticsMonthProgress');
    monthProgress.innerHTML = '';

    for (let m = 1; m <= 6; m++) {
      const mDays = data.days.filter(d => d.monthNumber === m);
      const mPub = mDays.filter(d => d.status === 'Published').length;
      const pct = Math.round((mPub / mDays.length) * 100);
      const theme = data.monthThemes[m];

      const card = document.createElement('div');
      card.className = 'swipe-card';
      card.innerHTML = `
        <div style="font-weight: 800; color: ${theme.color}; font-size: 0.95rem; margin-bottom: 0.25rem;">Month ${m}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">${theme.theme}</div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
          <span>Production</span>
          <strong>${mPub} / ${mDays.length} (${pct}%)</strong>
        </div>
        <div style="background: var(--bg-primary); height: 6px; border-radius: 3px; overflow: hidden;">
          <div style="background: ${theme.color}; width: ${pct}%; height: 100%;"></div>
        </div>
      `;
      monthProgress.appendChild(card);
    }
  }

  // =========================================================================
  // MODAL / DAY INSPECTOR DRAWER
  // =========================================================================
  function openDayModal(dayId) {
    const day = data.days.find(d => d.id === dayId);
    if (!day) return;
    state.selectedDay = day;

    modalDayNumber.textContent = `${day.dayString} (Month ${day.monthNumber})`;
    modalSeriesTag.textContent = day.contentSeries;
    modalPillarTag.textContent = day.contentPillar;
    modalIndustryTag.textContent = `${day.industry}${day.niche ? ' · ' + day.niche : ''}`;
    modalDateString.textContent = day.date;
    modalStatusSelect.value = day.status;

    modalHookText.textContent = day.hook;
    modalTimingHook.textContent = `"${day.hook}" — on-screen text mirrors spoken words verbatim.`;
    modalTimingReceipt.textContent = `Show proof immediately: ${day.videoIdea || 'Screen recording of AI query or analytics page.'}`;
    modalTimingFix.textContent = day.diySteps !== '—' ? `DIY Fix: ${day.diySteps}` : `One core concept: ${day.keyLesson || day.mainTopic}`;
    modalTimingCTA.textContent = `Call to Action: "${day.cta}"`;

    modalKeywords.textContent = day.seoKeywords || '—';
    modalHashtags.textContent = day.hashtags || '—';

    renderPlatformCopyText();
    teleprompterModal.classList.add('active');
  }

  function renderPlatformCopyText() {
    if (!state.selectedDay) return;
    const day = state.selectedDay;
    let text = '';

    switch (state.activePlatformTab) {
      case 'tiktok':
        text = `📱 TIKTOK MASTER CUT SCRIPT:\n\n${day.platforms.tiktok || day.hook}\n\nCaption:\n${day.caption}\n\nTags:\n${day.hashtags}`;
        break;
      case 'instagramReel':
        text = `📸 INSTAGRAM REEL:\n\nIdea & Cover Frame:\n${day.platforms.instagramReel}\n\nCaption (First line = Hook):\n${day.caption}\n\nStory Sticker Idea:\n${day.platforms.instagramStory}\n\nTags:\n${day.hashtags}`;
        break;
      case 'facebookReel':
        text = `👥 FACEBOOK REEL & NATIVE POST:\n\nVideo Concept:\n${day.platforms.facebookReel}\n\nNative Post / Discussion Caption:\n${day.caption}\n\nQuestion for Comments Loop:\nWhat % of your bookings/clients come through search today?`;
        break;
      case 'linkedIn':
        text = `💼 LINKEDIN POST (Text-First):\n\n${day.platforms.linkedIn}\n\nTags:\n${day.hashtags}`;
        break;
      case 'youtubeShort':
        text = `▶️ YOUTUBE SHORT & LONG-FORM:\n\nShort Concept (30–45s):\n${day.platforms.youtubeShort}\n\nLong-Form Breakdown (if weekly):\n${day.platforms.youtubeLong || '—'}`;
        break;
      case 'instagramStory':
        text = `✨ INSTAGRAM & FACEBOOK STORY:\n\nInteractive Sticker Prompt:\n${day.platforms.instagramStory}\n\nReshare Reel with prompt.`;
        break;
      case 'diySteps':
        text = `🛠️ STEP-BY-STEP DIY ACTION GUIDE:\n\n${day.diySteps}\n\nTakeaway:\n${day.keyLesson}`;
        break;
    }

    modalPlatformCopyBox.textContent = text;
  }

  // Drawer Platform Tab Click Handlers
  drawerPlatformTabs.querySelectorAll('.drawer-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      drawerPlatformTabs.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activePlatformTab = btn.dataset.platform;
      renderPlatformCopyText();
    });
  });

  // Modal Status Select Change
  modalStatusSelect.addEventListener('change', (e) => {
    if (state.selectedDay) {
      updateDayStatus(state.selectedDay.id, e.target.value);
    }
  });

  // Copy Active Platform Copy Button
  btnCopyActivePlatform.addEventListener('click', () => {
    const text = modalPlatformCopyBox.textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast("Platform copy copied to clipboard!");
    });
  });

  // Close Drawer
  function closeDayModal() {
    teleprompterModal.classList.remove('active');
    state.selectedDay = null;
  }

  btnCloseDrawer.addEventListener('click', closeDayModal);
  teleprompterModal.addEventListener('click', (e) => {
    if (e.target === teleprompterModal) closeDayModal();
  });

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDayModal();
    }
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // =========================================================================
  // VIEW SWITCHING
  // =========================================================================
  function renderCurrentView() {
    if (state.currentView === 'kanban') renderKanban();
    else if (state.currentView === 'calendar') renderCalendar();
    else if (state.currentView === 'table') renderTable();
    else if (state.currentView === 'memes') renderMemeStudio();
    else if (state.currentView === 'strategy') renderStrategy();
    else if (state.currentView === 'analytics') renderAnalytics();
    else if (state.currentView === 'freestyle') renderFreestyle();
  }

  function switchView(viewName) {
    state.currentView = viewName;

    // Update Nav Buttons
    viewNav.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Hide all view sections
    [viewKanban, viewCalendar, viewTable, viewMemes, viewStrategy, viewAnalytics, viewFreestyle].forEach(el => {
      if (el) {
        el.style.display = 'none';
        el.classList.remove('active');
      }
    });

    // Show selected
    let activeEl = viewKanban;
    if (viewName === 'kanban') activeEl = viewKanban;
    else if (viewName === 'calendar') activeEl = viewCalendar;
    else if (viewName === 'table') activeEl = viewTable;
    else if (viewName === 'memes') activeEl = viewMemes;
    else if (viewName === 'strategy') activeEl = viewStrategy;
    else if (viewName === 'analytics') activeEl = viewAnalytics;
    else if (viewName === 'freestyle') activeEl = viewFreestyle;

    activeEl.style.display = 'block';
    activeEl.classList.add('active');

    // Show/hide control bar for non-schedule views
    if (viewName === 'memes' || viewName === 'strategy' || viewName === 'analytics' || viewName === 'freestyle') {
      globalControlBar.style.display = 'none';
      resultsMetaBar.style.display = 'none';
    } else {
      globalControlBar.style.display = 'block';
      resultsMetaBar.style.display = 'flex';
    }

    renderCurrentView();
  }

  viewNav.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Filter Input Listeners
  searchInput.addEventListener('input', (e) => {
    state.filters.search = e.target.value.trim();
    renderCurrentView();
    updateHeaderKPIs();
  });

  pillarFilter.addEventListener('change', (e) => {
    state.filters.pillar = e.target.value;
    renderCurrentView();
    updateHeaderKPIs();
  });

  seriesFilter.addEventListener('change', (e) => {
    state.filters.series = e.target.value;
    renderCurrentView();
    updateHeaderKPIs();
  });

  industryFilter.addEventListener('change', (e) => {
    state.filters.industry = e.target.value;
    renderCurrentView();
    updateHeaderKPIs();
  });

  statusFilter.addEventListener('change', (e) => {
    state.filters.status = e.target.value;
    renderCurrentView();
    updateHeaderKPIs();
  });

  btnResetFilters.addEventListener('click', () => {
    state.filters = {
      search: '',
      pillar: 'ALL',
      series: 'ALL',
      industry: 'ALL',
      status: 'ALL'
    };
    state.selectedMonth = null;
    searchInput.value = '';
    pillarFilter.value = 'ALL';
    seriesFilter.value = 'ALL';
    industryFilter.value = 'ALL';
    statusFilter.value = 'ALL';

    renderMonthTabs();
    renderCurrentView();
    updateHeaderKPIs();
    showToast("All filters have been reset.");
  });

  // Export Data to CSV
  btnExportData.addEventListener('click', () => {
    const days = getFilteredDays();
    if (days.length === 0) {
      showToast("No days to export.", "⚠️");
      return;
    }

    const headers = ["Day", "Date", "Month", "Industry", "Niche", "Pillar", "Series", "Hook", "CTA", "Status"];
    const rows = days.map(d => [
      `"${d.dayString}"`,
      `"${d.date}"`,
      `"${d.monthTheme}"`,
      `"${d.industry}"`,
      `"${d.niche}"`,
      `"${d.contentPillar}"`,
      `"${d.contentSeries}"`,
      `"${d.hook.replace(/"/g, '""')}"`,
      `"${d.cta}"`,
      `"${d.status}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `afrishield_content_calendar_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${days.length} days to CSV!`);
  });

  // ==========================================================================
  // FREESTYLE CONTENT LAB — 15 blueprint cards, editable, persisted
  // ==========================================================================
  const freestyleData = window.AFRISHIELD_FREESTYLE;
  const freestyleState = {
    statuses: JSON.parse(localStorage.getItem('afrishield_freestyle_statuses') || '{}'),
    notes: JSON.parse(localStorage.getItem('afrishield_freestyle_notes') || '{}'),
    statusFilter: 'ALL',
    activePostId: null
  };

  function getFreestylePostStatus(post) {
    return freestyleState.statuses[post.id] || 'Not Started';
  }
  function persistFreestyleStatuses() {
    localStorage.setItem('afrishield_freestyle_statuses', JSON.stringify(freestyleState.statuses));
  }
  function persistFreestyleNotes() {
    localStorage.setItem('afrishield_freestyle_notes', JSON.stringify(freestyleState.notes));
  }

  function statusToClass(status) {
    return 'fs-status-' + status.toLowerCase().replace(/\s+/g, '-');
  }

  function renderFreestyle() {
    if (!freestyleData) return;

    // Hero copy
    const heroSub = document.getElementById('freestyleHeroSubtitle');
    const heroPurpose = document.getElementById('freestyleHeroPurpose');
    if (heroSub) heroSub.textContent = freestyleData.meta.subtitle;
    if (heroPurpose) heroPurpose.textContent = freestyleData.meta.purpose;

    // Stats
    const posts = freestyleData.posts;
    const publishedCount = posts.filter(p => getFreestylePostStatus(p) === 'Published').length;
    const inProgressCount = posts.filter(p => {
      const s = getFreestylePostStatus(p);
      return s !== 'Not Started' && s !== 'Published';
    }).length;
    document.getElementById('freestyleTotalCount').textContent = posts.length;
    document.getElementById('freestylePublishedCount').textContent = publishedCount;
    document.getElementById('freestyleInProgressCount').textContent = inProgressCount;

    // Core categories row
    const catRow = document.getElementById('freestyleCategoriesRow');
    if (catRow) {
      catRow.innerHTML = freestyleData.meta.coreCategories.map(c => `
        <div class="freestyle-category-chip">
          <span class="chip-icon">${c.icon}</span>
          <div class="chip-body">
            <div class="chip-label">${escapeHtml(c.label)}</div>
            ${c.note ? `<div class="chip-note">${escapeHtml(c.note)}</div>` : ''}
          </div>
        </div>
      `).join('');
    }

    // Playbook
    const pbTitle = document.getElementById('freestylePlaybookTitle');
    const pbList = document.getElementById('freestylePlaybookList');
    if (pbTitle) pbTitle.textContent = freestyleData.meta.playbook.title;
    if (pbList) {
      pbList.innerHTML = freestyleData.meta.playbook.steps.map(s =>
        `<li>${escapeHtml(s)}</li>`
      ).join('');
    }

    // Status pills active state
    document.querySelectorAll('#freestyleStatusPills .freestyle-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.status === freestyleState.statusFilter);
    });

    // Filter posts
    const filtered = freestyleState.statusFilter === 'ALL'
      ? posts
      : posts.filter(p => getFreestylePostStatus(p) === freestyleState.statusFilter);

    // Cards
    const grid = document.getElementById('freestyleCardsGrid');
    if (!grid) return;
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="freestyle-empty">No posts match the "${freestyleState.statusFilter}" filter.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const status = getFreestylePostStatus(p);
      const hasNotes = !!(freestyleState.notes[p.id] || '').trim();
      return `
        <button type="button" class="freestyle-card" data-post-id="${p.id}">
          <div class="freestyle-card-top">
            <span class="freestyle-card-number">${String(p.number).padStart(2, '0')}</span>
            <span class="freestyle-card-status ${statusToClass(status)}">${status}</span>
          </div>
          <h3 class="freestyle-card-title">${escapeHtml(p.title)}</h3>
          <div class="freestyle-card-format">${escapeHtml(p.format)}</div>
          <div class="freestyle-card-hook">"${escapeHtml(p.hookSpoken)}"</div>
          <div class="freestyle-card-footer">
            <span class="freestyle-card-cta">💬 ${escapeHtml(p.cta)}</span>
            <span class="freestyle-card-category">${escapeHtml(p.category)}</span>
            ${hasNotes ? '<span class="freestyle-card-notes-flag" title="Has notes">📝</span>' : ''}
          </div>
        </button>
      `;
    }).join('');

    // Bind card clicks
    grid.querySelectorAll('.freestyle-card').forEach(card => {
      card.addEventListener('click', () => openFreestyleModal(card.dataset.postId));
    });
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Status filter pill listeners
  document.querySelectorAll('#freestyleStatusPills .freestyle-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      freestyleState.statusFilter = btn.dataset.status;
      renderFreestyle();
    });
  });

  // Freestyle modal open/close
  const freestyleModal = document.getElementById('freestyleModal');
  const btnCloseFsDrawer = document.getElementById('btnCloseFsDrawer');
  const fsModalStatusSelect = document.getElementById('fsModalStatusSelect');
  const fsModalNotes = document.getElementById('fsModalNotes');
  const fsNotesSavedIndicator = document.getElementById('fsNotesSavedIndicator');

  function openFreestyleModal(postId) {
    const post = freestyleData.posts.find(p => p.id === postId);
    if (!post) return;
    freestyleState.activePostId = postId;

    document.getElementById('fsModalNumber').textContent = 'Post ' + String(post.number).padStart(2, '0');
    document.getElementById('fsModalFormat').textContent = post.format;
    document.getElementById('fsModalCategory').textContent = post.category;
    document.getElementById('fsModalCta').textContent = 'CTA: ' + post.cta;
    document.getElementById('fsModalTitle').textContent = post.title;
    document.getElementById('fsModalIntent').textContent = post.searchIntent;
    document.getElementById('fsModalQueries').innerHTML = post.searchQueries.map(q => `<code>${escapeHtml(q)}</code>`).join(' &nbsp;·&nbsp; ');
    document.getElementById('fsModalHookSpoken').textContent = post.hookSpoken;
    document.getElementById('fsModalHookText').textContent = post.hookText;
    document.getElementById('fsTimingHook').textContent = post.hookText + ' — ' + post.hookSpoken;
    document.getElementById('fsTimingReceipt').textContent = post.receipt;
    const bd = document.getElementById('fsTimingBreakdown');
    bd.innerHTML = post.breakdown.map(b => `<li>${escapeHtml(b)}</li>`).join('');
    document.getElementById('fsTimingPayoff').textContent = post.payoff;
    document.getElementById('fsTimingCta').textContent = post.ctaLine;
    document.getElementById('fsModalHashtags').textContent = post.hashtags;

    fsModalStatusSelect.value = getFreestylePostStatus(post);
    fsModalNotes.value = freestyleState.notes[post.id] || '';
    fsNotesSavedIndicator.style.opacity = '0';

    freestyleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFreestyleModal() {
    freestyleModal.classList.remove('active');
    document.body.style.overflow = '';
    freestyleState.activePostId = null;
  }

  btnCloseFsDrawer.addEventListener('click', closeFreestyleModal);
  freestyleModal.addEventListener('click', (e) => {
    if (e.target === freestyleModal) closeFreestyleModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && freestyleModal.classList.contains('active')) closeFreestyleModal();
  });

  // Status change in modal
  fsModalStatusSelect.addEventListener('change', (e) => {
    if (!freestyleState.activePostId) return;
    freestyleState.statuses[freestyleState.activePostId] = e.target.value;
    persistFreestyleStatuses();
    showToast(`Status updated to "${e.target.value}"`);
    renderFreestyle();
  });

  // Notes autosave (debounced)
  let notesSaveTimer;
  fsModalNotes.addEventListener('input', () => {
    if (!freestyleState.activePostId) return;
    freestyleState.notes[freestyleState.activePostId] = fsModalNotes.value;
    clearTimeout(notesSaveTimer);
    notesSaveTimer = setTimeout(() => {
      persistFreestyleNotes();
      fsNotesSavedIndicator.style.opacity = '1';
      setTimeout(() => { fsNotesSavedIndicator.style.opacity = '0'; }, 1200);
      renderFreestyle();
    }, 400);
  });

  // Copy script & caption
  document.getElementById('btnFsCopyScript').addEventListener('click', () => {
    const post = freestyleData.posts.find(p => p.id === freestyleState.activePostId);
    if (!post) return;
    const script = [
      `POST ${String(post.number).padStart(2, '0')} — ${post.title}`,
      `Category: ${post.category} | Format: ${post.format} | CTA: ${post.cta}`,
      '',
      `HOOK (0–2s spoken): ${post.hookSpoken}`,
      `HOOK (on-screen): ${post.hookText}`,
      '',
      `RECEIPT (2–8s): ${post.receipt}`,
      '',
      'BREAKDOWN (8–35s):',
      ...post.breakdown.map((b, i) => `  ${i + 1}. ${b}`),
      '',
      `PAYOFF (35–42s): ${post.payoff}`,
      `CTA (42–45s): ${post.ctaLine}`,
      '',
      `HASHTAGS: ${post.hashtags}`
    ].join('\n');
    navigator.clipboard.writeText(script).then(() => showToast('Full script copied to clipboard!'));
  });

  document.getElementById('btnFsCopyCaption').addEventListener('click', () => {
    const post = freestyleData.posts.find(p => p.id === freestyleState.activePostId);
    if (!post) return;
    const caption = `${post.hookText}\n\n${post.payoff}\n\n👉 ${post.ctaLine}\n\n${post.hashtags}`;
    navigator.clipboard.writeText(caption).then(() => showToast('Caption + hashtags copied!'));
  });

  // Export freestyle CSV
  document.getElementById('btnExportFreestyle').addEventListener('click', () => {
    const posts = freestyleData.posts;
    const headers = ['#', 'ID', 'Title', 'Category', 'Format', 'CTA', 'Status', 'Hook (Spoken)', 'Payoff', 'Hashtags', 'Notes'];
    const rows = posts.map(p => [
      p.number,
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.category.replace(/"/g, '""')}"`,
      `"${p.format.replace(/"/g, '""')}"`,
      p.cta,
      getFreestylePostStatus(p),
      `"${p.hookSpoken.replace(/"/g, '""')}"`,
      `"${p.payoff.replace(/"/g, '""')}"`,
      `"${p.hashtags.replace(/"/g, '""')}"`,
      `"${(freestyleState.notes[p.id] || '').replace(/"/g, '""')}"`
    ]);
    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `afrishield_freestyle_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${posts.length} freestyle posts!`);
  });

  // Initial Boot
  populateSeriesDropdown();
  renderMonthTabs();
  renderCurrentView();
  updateHeaderKPIs();
  console.log("AfriShield Content Board & Instagram Meme Studio initialized successfully.");
});
