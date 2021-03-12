"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var productArray = [];

var ProductRow = /*#__PURE__*/function (_React$Component) {
  _inherits(ProductRow, _React$Component);

  var _super = _createSuper(ProductRow);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _super.apply(this, arguments);
  }

  _createClass(ProductRow, [{
    key: "render",
    value: function render() {
      var product = this.props.product;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, product.name), /*#__PURE__*/React.createElement("td", null, "$", product.price), /*#__PURE__*/React.createElement("td", null, product.category), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
        href: product.imageurl,
        target: "_blank"
      }, " View ")));
    }
  }]);

  return ProductRow;
}(React.Component);

var ProductTable = /*#__PURE__*/function (_React$Component2) {
  _inherits(ProductTable, _React$Component2);

  var _super2 = _createSuper(ProductTable);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _super2.apply(this, arguments);
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {
      var productRows = this.props.products.map(function (product) {
        return /*#__PURE__*/React.createElement(ProductRow, {
          key: product.id,
          product: product
        });
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Name"), /*#__PURE__*/React.createElement("th", null, "Price"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
    }
  }]);

  return ProductTable;
}(React.Component);

var ProductAdd = /*#__PURE__*/function (_React$Component3) {
  _inherits(ProductAdd, _React$Component3);

  var _super3 = _createSuper(ProductAdd);

  function ProductAdd() {
    var _this;

    _classCallCheck(this, ProductAdd);

    _this = _super3.call(this);
    _this.state = {
      price: '$'
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handlePriceChange = _this.handlePriceChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ProductAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.productAdd;
      var priceNum = form.price.value.replace(/\$/g, '');
      var product = {
        name: form.name.value,
        price: priceNum,
        category: form.category.value,
        imageurl: form.imageurl.value
      };
      this.props.createProduct(product);
      form.name.value = "";
      this.setState({
        price: '$'
      });
      form.category.value = "";
      form.imageurl.value = "";
    }
  }, {
    key: "handlePriceChange",
    value: function handlePriceChange(e) {
      this.setState({
        price: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "productAdd",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "formContainer"
      }, /*#__PURE__*/React.createElement("div", {
        className: "formCol"
      }, "Category:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("select", {
        name: "category"
      }, /*#__PURE__*/React.createElement("option", {
        value: "Shirts"
      }, "Shirts"), /*#__PURE__*/React.createElement("option", {
        value: "Jeans"
      }, "Jeans"), /*#__PURE__*/React.createElement("option", {
        value: "Jackets"
      }, "Jackets"), /*#__PURE__*/React.createElement("option", {
        value: "Sweaters"
      }, "Sweaters"), /*#__PURE__*/React.createElement("option", {
        value: "Accessories"
      }, "Accessories")), /*#__PURE__*/React.createElement("br", null), "Product Name:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name"
      }), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
        className: "formCol"
      }, "Price Per Unit:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "price",
        value: this.state.price,
        onChange: this.handlePriceChange
      }), /*#__PURE__*/React.createElement("br", null), "Image URL:", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "imageurl"
      }), /*#__PURE__*/React.createElement("br", null))), /*#__PURE__*/React.createElement("button", null, "Add Product"));
    }
  }]);

  return ProductAdd;
}(React.Component);

var ProductList = /*#__PURE__*/function (_React$Component4) {
  _inherits(ProductList, _React$Component4);

  var _super4 = _createSuper(ProductList);

  function ProductList() {
    var _this2;

    _classCallCheck(this, ProductList);

    _this2 = _super4.call(this);
    _this2.state = {
      products: []
    };
    _this2.createProduct = _this2.createProduct.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(ProductList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        products: productArray
      });
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, response, body, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query {\n            productList {\n                id\n                category\n                name\n                price\n                imageurl\n            }\n        }";
                _context.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query
                  })
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.text();

              case 6:
                body = _context.sent;
                result = JSON.parse(body);
                this.setState({
                  products: result.data.productList
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "createProduct",
    value: function () {
      var _createProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(product) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation productAdd($product: ProductInputs!) {\n            productAdd(product: $product) {\n              id\n            }\n          }";
                _context2.next = 3;
                return fetch('/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      product: product
                    }
                  })
                });

              case 3:
                response = _context2.sent;
                this.loadData();

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createProduct(_x) {
        return _createProduct.apply(this, arguments);
      }

      return createProduct;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "My Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
        products: this.state.products
      }), /*#__PURE__*/React.createElement("h3", null, "Add a new product to the Inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
        createProduct: this.createProduct
      }));
    }
  }]);

  return ProductList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('contents'));