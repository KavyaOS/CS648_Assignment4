/* eslint linebreak-style: ["error", "windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "react/no-multi-comp": "off" */

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <tr>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.category}</td>
        <td><a href={product.imageurl} target="_blank"> View </a></td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product =>
      <ProductRow key={product.id} product={product} />
    );
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    );
  }
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.state = { price: '$' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const priceNum = form.price.value.replace(/\$/g, '');
    const product = {
      name: form.name.value,
      price: priceNum,
      category: form.category.value,
      imageurl: form.imageurl.value,
    };
    this.props.createProduct(product);
    form.name.value='';
    this.setState({ price: '$' });
    form.category.value = '';
    form.imageurl.value = '';
  }

  handlePriceChange(e) {
    this.setState({ price: e.target.value });
  }

  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit}>
        <div className="formContainer">
          <div className="formCol">
            Category:
            <br/>
            <select name="category">
              <option value="Shirts">Shirts</option>
              <option value="Jeans">Jeans</option>
              <option value="Jackets">Jackets</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Accessories">Accessories</option>
            </select>
            <br/>
            Product Name:<br/>
            <input type="text" name="name"/>
            <br/>
          </div>
          <div className="formCol" >
            Price Per Unit:<br/>
            <input type = "text" name = "price" value = { this.state.price } onChange = { this.handlePriceChange }/>
            <br/>
            Image URL:<br/>
            <input type="text" name="imageurl" />
            <br/>
          </div>
        </div>
        <button>Add Product</button>
      </form>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  const response = await fetch(window.ENV.UI_API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const body = await response.text();
  const result = JSON.parse(body);
  return result.data;
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        productList {
            id
            category
            name
            price
            imageurl
        }
    }`

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ products: data.productList });
    }
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: ProductInputs!) {
      productAdd(product: $product) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { product })
    if (data) {
      this.loadData()
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <h3>Showing all available products</h3>
        <hr/>
        <ProductTable products={this.state.products} />
        <h3>Add a new product to the Inventory</h3>
        <hr/>
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}

const element = <ProductList/>;

ReactDOM.render(element, document.getElementById('contents'));
