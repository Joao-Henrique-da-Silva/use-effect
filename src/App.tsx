import { GetProduct } from './components/GetProduct'

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Produtos da Loja</h1>
      <GetProduct />
    </div>
  )
}

export default App