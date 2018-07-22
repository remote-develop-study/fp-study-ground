((window, document) => {
  const LEVEL_MAX = 9;
  const OPERAND_MAX = 9;
  const LEVELS = [...Array(LEVEL_MAX).keys()].map(v => v + 1);
  const DEFAULT_LEVEL = LEVELS[0];
  const OPERANDS = [...Array(OPERAND_MAX).keys()].map(v => v + 1);

  const createWiredItemComponent = (htmlAttrs) => {
    const $wiredItem = document.createElement('wired-item');
    Object.entries(htmlAttrs).map(([k, v]) => $wiredItem.setAttribute(k, v));
    return $wiredItem;
  };

  const GuguTable = {
    $container: document.querySelector('wired-listbox'),
    _currentLevel: DEFAULT_LEVEL,
    _operands: OPERANDS,

    init() {
      this.operands.map(operand => {
        const text = this.guguText(operand);
        const role = 'option';
        const $guguTableItems = createWiredItemComponent({ text, role });
        this.$container.appendChild($guguTableItems);
      })
    },

    _update() {
      this.$guguTableItems.forEach(($item, index) => {
        $item.setAttribute('text', this.guguText(this.operands[index]))
      })
    },

    guguText(operand) {
      return `${this.currentLevel} x ${operand} = ${(this.currentLevel*operand).toString()}`;
    },

    get $guguTableItems() {
      return this.$container.childNodes
    },

    get operands() {
      return this._operands
    },

    get currentLevel() {
      return this._currentLevel
    },

    set currentLevel(level) {
     this._currentLevel = level;
     this._update()
    }
  };

  const GuguOptions = {
    $container: document.querySelector('wired-combo'),
    _levels: LEVELS,
    _currentLevel: DEFAULT_LEVEL,

    init() {
      this.levels.map(v => {
        const value = v;
        const text = `${v}단`;
        const $wiredItem = createWiredItemComponent({ value, text });
        this.$container.appendChild($wiredItem)
      });
      this.$container.setAttribute('selected', DEFAULT_LEVEL);
      this.attachEvent();
    },

    attachEvent() {
      this.$container.addEventListener('selected', e => {
        const { selected } = e.detail;
        GuguTable.currentLevel = selected
      })
    },

    get levels() {
      return this._levels
    }

  };

  GuguOptions.init();
  GuguTable.init();

})(window, document);

