import React, { useState, useEffect } from 'react';
import { 
  Car, MapPin, Phone, Clock, Star, Shield, Award, 
  ChevronLeft, ChevronRight, Menu, X, Plus, Edit, Trash2,
  User, Lock, LogOut, 
  AlertTriangle // ADICIONEI ESTE ÍCONE
} from 'lucide-react';

// --- DADOS INICIAIS (NOSSA "BASE DE DADOS" FALSA) ---
const initialCarData = [
  // ... (dados dos carros permanecem os mesmos)
  {
    id: 1,
    name: "Toyota Corolla XEi 2.0",
    year: "2022/2023",
    km: "15.000 km",
    price: "R$ 125.900",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop&q=80",
    features: ["Automático", "Flex", "Completo"]
  },
  {
    id: 2,
    name: "Honda Civic Sport 2.0",
    year: "2023/2023",
    km: "8.500 km",
    price: "R$ 159.900",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&h=600&fit=crop&q=80",
    features: ["Automático", "Gasolina", "Turbo"]
  },
  {
    id: 3,
    name: "Jeep Compass Limited",
    year: "2022/2023",
    km: "12.000 km",
    price: "R$ 179.900",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=600&fit=crop&q=80",
    features: ["4x4", "Diesel", "Premium"]
  },
  {
    id: 4,
    name: "VW Nivus Highline",
    year: "2021/2022",
    km: "25.000 km",
    price: "R$ 115.000",
    image: "https://images.unsplash.com/photo-1622318625205-e7b8f9e0c662?w=800&h=600&fit=crop&q=80",
    features: ["Automático", "Flex", "TSI"]
  },
  {
    id: 5,
    name: "Hyundai Creta N-Line",
    year: "2023/2023",
    km: "5.000 km",
    price: "R$ 165.900",
    image: "https://images.unsplash.com/photo-1628174151703-93c04e3f4e1f?w=800&h=600&fit=crop&q=80",
    features: ["Automático", "Flex", "Teto Solar"]
  },
  {
    id: 6,
    name: "BMW 320i M Sport",
    year: "2021/2022",
    km: "19.000 km",
    price: "R$ 279.900",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop&q=80",
    features: ["Automático", "Gasolina", "Premium"]
  }
];

// --- NOVO COMPONENTE: MODAL DE CONFIRMAÇÃO ---
const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent} role="alertdialog" aria-modal="true" aria-labelledby="confirm-title">
        <div style={styles.confirmHeader}>
          <AlertTriangle size={24} color="#c41e3a" />
          <h2 id="confirm-title" style={styles.confirmTitle}>{title}</h2>
        </div>
        <p style={styles.confirmMessage}>{message}</p>
        <div style={styles.modalButtonContainer}>
          <button onClick={onCancel} style={styles.modalButtonSecondary}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={{...styles.modalButtonPrimary, backgroundColor: '#c41e3a'}}>
            Confirmar Exclusão
          </button>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE DO MODAL DE ADMIN (ADICIONAR/EDITAR) ---
const AdminModal = ({ car, onClose, onSave }) => {
  // ... (componente AdminModal permanece o mesmo)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    year: '',
    km: '',
    price: '',
    image: '',
    features: ''
  });

  useEffect(() => {
    if (car) {
      // Editando um carro existente
      setFormData({
        ...car,
        features: car.features.join(', ') // Transforma o array em string para o input
      });
    } else {
      // Adicionando um novo carro
      setFormData({
        id: null,
        name: '',
        year: '',
        km: '',
        price: '',
        image: 'https://placehold.co/800x600/cccccc/333333?text=Nova+Imagem',
        features: ''
      });
    }
  }, [car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const carDataToSave = {
      ...formData,
      // Transforma a string de features de volta em array
      features: formData.features.split(',').map(f => f.trim()),
      // Garante um ID único se for um carro novo
      id: formData.id || Date.now() 
    };
    onSave(carDataToSave);
    onClose();
  };

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent}>
        <h2>{car ? "Editar Carro" : "Adicionar Novo Carro"}</h2>
        <form onSubmit={handleSubmit} style={styles.modalForm}>
          <input
            style={styles.modalInput}
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome (Ex: Toyota Corolla)"
            required
          />
          <input
            style={styles.modalInput}
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Ano (Ex: 2022/2023)"
            required
          />
          <input
            style={styles.modalInput}
            name="km"
            value={formData.km}
            onChange={handleChange}
            placeholder="KM (Ex: 15.000 km)"
            required
          />
          <input
            style={styles.modalInput}
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Preço (Ex: R$ 125.900)"
            required
          />
          <input
            style={styles.modalInput}
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL da Imagem"
            required
          />
          <input
            style={styles.modalInput}
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Recursos (Ex: Automático, Flex, Completo)"
            required
          />
          <div style={styles.modalButtonContainer}>
            <button type="button" onClick={onClose} style={styles.modalButtonSecondary}>
              Cancelar
            </button>
            <button type="submit" style={styles.modalButtonPrimary}>
              Salvar Carro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTE REUTILIZÁVEL DO CARD DO CARRO ---
const CarCard = ({ car, isAdmin, onEdit, onDelete }) => {
  // ... (componente CarCard permanece o mesmo)
  return (
    <div style={styles.carCard}>
      {isAdmin && (
        <div style={styles.adminButtonContainer}>
          <button style={styles.adminButtonEdit} onClick={() => onEdit(car)}>
            <Edit size={16} />
          </button>
          <button style={styles.adminButtonDelete} onClick={() => onDelete(car.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      )}
      <img 
        src={car.image} 
        alt={car.name}
        style={styles.carImage}
        onError={(e) => { e.target.src = 'https://placehold.co/800x600/e0e0e0/b0b0b0?text=Imagem+Indisponível'; }}
      />
      <div style={styles.carInfo}>
        <h3 style={styles.carName}>{car.name}</h3>
        <div style={styles.carDetails}>
          <span style={styles.carDetail}>{car.year}</span>
          <span style={styles.carDetail}>{car.km}</span>
        </div>
        <div style={styles.carFeatures}>
          {car.features.map((feature, idx) => (
            <span key={idx} style={styles.carFeature}>{feature}</span>
          ))}
        </div>
        <div style={styles.carPrice}>{car.price}</div>
        <button style={styles.carButton}>Tenho Interesse</button>
      </div>
    </div>
  );
};

// --- COMPONENTE DA PÁGINA INICIAL ---
const HomePage = ({ navigate }) => { // Props alteradas
  // Logic do carrossel removida
  // const [currentSlide, setCurrentSlide] = useState(0);
  
  // useEffect(() => {
  //   if (featuredCars.length === 0) return;
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, [featuredCars.length]);

  // const nextSlide = () => {
  //   if (featuredCars.length === 0) return;
  //   setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
  // };

  // const prevSlide = () => {
  //   if (featuredCars.length === 0) return;
  //   setCurrentSlide((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
  // };

  const benefits = [
    { icon: <Shield size={40} />, title: "Garantia Estendida", description: "Todos os veículos com garantia e procedência verificada" },
    { icon: <Award size={40} />, title: "Qualidade Premium", description: "Seminovos selecionados com baixa quilometragem" },
    { icon: <Star size={40} />, title: "Melhor Atendimento", description: "Equipe especializada para melhor te atender" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>SEMINOVOS PREMIUM</h1>
          <p style={styles.heroSubtitle}>Veículos selecionados com baixa quilometragem</p>
          {/* Botão atualizado para navegar para a página de estoque */}
          <a onClick={() => navigate('allCars')} style={styles.heroButton}>Ver Estoque</a>
        </div>
      </section>

      {/* Benefits */}
      <section style={styles.benefitsSection}>
        <div style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.benefitCard}>
              <div style={styles.benefitIcon}>{benefit.icon}</div>
              <h3 style={styles.benefitTitle}>{benefit.title}</h3>
              <p style={styles.benefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Cars Carousel - REMOVIDO */}
      {/* <section id="veiculos" style={styles.carsSection}>
        <h2 style={styles.sectionTitle}>Veículos em Destaque</h2>
        {featuredCars.length > 0 ? (
          <>
            <div style={styles.carouselContainer}>
              <button 
                style={{...styles.carouselButton, ...styles.carouselButtonLeft}}
                onClick={prevSlide}
              >
                <ChevronLeft size={32} />
              </button>
              
              <div style={styles.carouselSlide}>
                <CarCard 
                  car={featuredCars[currentSlide]} 
                  isAdmin={isAdmin}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
              
              <button 
                style={{...styles.carouselButton, ...styles.carouselButtonRight}}
                onClick={nextSlide}
              >
                <ChevronRight size={32} />
              </button>
            </div>
            
            <div style={styles.carouselDots}>
              {featuredCars.map((_, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.dot,
                    ...(index === currentSlide ? styles.dotActive : {})
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </>
        ) : (
          <p style={styles.emptyStock}>Nenhum carro em destaque no momento.</p>
        )}
      </section>
      */}

      {/* About Section */}
      <section id="sobre" style={styles.aboutSection}>
        <div style={styles.aboutContent}>
          <h2 style={styles.aboutTitle}>Sobre a Jet Balbek</h2>
          <p style={styles.aboutText}>
            Somos especializados em veículos seminovos premium, oferecendo os melhores carros 
            com baixa quilometragem e procedência garantida. Nossa missão é proporcionar uma 
            experiência de compra transparente e confiável.
          </p>
          <p style={styles.aboutText}>
            Com unidades em Sorocaba e São Roque, estamos prontos para atender você com 
            excelência e comprometimento.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" style={styles.contactSection}>
        <h2 style={styles.sectionTitle}>Nossas Unidades</h2>
        <div style={styles.locationsGrid}>
          <div style={styles.locationCard}>
            <h3 style={styles.locationTitle}>Unidade Sorocaba</h3>
            <div style={styles.locationInfo}>
              <MapPin size={20} color="#c41e3a" />
              <p style={styles.locationText}>
                Av. Eng. Carlos Reinaldo Mendes, 2150<br />
                Alto da Boa Vista, Sorocaba - SP
              </p>
            </div>
            <div style={styles.locationInfo}>
              <Phone size={20} color="#c41e3a" />
              <p style={styles.locationText}>(15) 3000-0000</p>
            </div>
          </div>

          <div style={styles.locationCard}>
            <h3 style={styles.locationTitle}>Unidade São Roque</h3>
            <div style={styles.locationInfo}>
              <MapPin size={20} color="#c41e3a" />
              <p style={styles.locationText}>
                Avenida Varanguera, 380<br />
                Jardim Boa Vista, São Roque - SP
              </p>
            </div>
            <div style={styles.locationInfo}>
              <Phone size={20} color="#c41e3a" />
              <p style={styles.locationText}>(11) 4000-0000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <div style={styles.footerLogo}>
              <Car size={28} />
              <span style={styles.footerLogoText}>JET BALBEK</span>
            </div>
            <p style={styles.footerText}>
              Seminovos Premium com Qualidade Garantida
            </p>
          </div>
          
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Horário de Funcionamento</h4>
            <div style={styles.footerInfo}>
              <Clock size={18} />
              <span style={styles.footerText}>Seg - Sex: 9h às 18h</span>
            </div>
            <div style={styles.footerInfo}>
              <Clock size={18} />
              <span style={styles.footerText}>Sábado: 9h às 14h</span>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.footerBottomText}>
            © 2024 Jet Balbek Seminovos. Todos os direitos reservados.
          </p>
          <p style={styles.footerDisclaimer}>
            Reservamos o direito de eventuais erros de digitação na descrição, 
            valores ou fotos. Valores para pagamento à vista.
          </p>
        </div>
      </footer>
    </>
  );
};

// --- COMPONENTE DA PÁGINA DE ESTOQUE COMPLETO ---
const AllCarsPage = ({ cars, onEdit, onDelete, onAdd, isAdmin }) => {
  // ... (componente AllCarsPage permanece o mesmo)
  return (
    <section style={styles.allCarsContainer}>
      <div style={styles.allCarsHeader}>
        <h2 style={styles.sectionTitle}>Nosso Estoque Completo</h2>
        {isAdmin && (
          <button style={styles.addButton} onClick={onAdd}>
            <Plus size={20} /> Adicionar Novo Carro
          </button>
        )}
      </div>
      {cars.length > 0 ? (
        <div style={styles.allCarsGrid}>
          {cars.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              isAdmin={isAdmin}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <p style={styles.emptyStock}>Nosso estoque está vazio no momento.</p>
      )}
    </section>
  );
};

// --- NOVO COMPONENTE: PÁGINA DE LOGIN ---
const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- AUTENTICAÇÃO SIMULADA ---
    // Em um app real, isso seria uma chamada de API para um backend
    if (username === 'jetbalbek' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginBox}>
        <div style={styles.logo}>
          <Car size={32} color="#1a1a1a" />
          <span style={{...styles.logoText, color: '#1a1a1a'}}>JET BALBEK</span>
        </div>
        <h2 style={styles.loginTitle}>Acesso Administrativo</h2>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <div style={styles.loginInputGroup}>
            <User size={18} style={styles.loginIcon} />
            <input
              style={styles.loginInput}
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={styles.loginInputGroup}>
            <Lock size={18} style={styles.loginIcon} />
            <input
              style={styles.loginInput}
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={styles.loginError}>{error}</p>}
          <button type="submit" style={styles.loginButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL (APP) ---
const JetBalbekWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState('home'); // 'home' ou 'allCars'
  const [isAdmin, setIsAdmin] = useState(false); // Começa deslogado
  const [cars, setCars] = useState(initialCarData); // Nosso "banco de dados"
  
  // State para o Modal
  const [showModal, setShowModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  
  // NOVO state para controlar a exibição da página de login
  const [showLoginPage, setShowLoginPage] = useState(false);
  
  // NOVO state para o modal de confirmação
  const [carToDelete, setCarToDelete] = useState(null);
  
  // Efeito para verificar a URL e a sessão ao carregar o app
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('jetbalbek_admin_user');
    const path = window.location.pathname;

    if (loggedInUser) {
      // Se já está logado na sessão
      setIsAdmin(true);
      // Se tentou acessar /admin logado, redireciona para o estoque
      if (path === '/admin') {
        setPage('allCars');
        // Limpa a URL para evitar confusão
        window.history.pushState({}, '', '/');
      }
    } else if (path === '/admin') {
      // Se acessou /admin e NÃO está logado
      setShowLoginPage(true);
    }
    // Se não caiu em nenhuma condição, é um usuário normal na home
  }, []);


  // --- Funções de CRUD (Create, Read, Update, Delete) ---

  const handleSaveCar = (carData) => {
    // ... (função handleSaveCar permanece a mesma)
    if (carToEdit) {
      // Editando
      setCars(cars.map(c => c.id === carData.id ? carData : c));
    } else {
      // Adicionando
      setCars([carData, ...cars]);
    }
  };

  const handleAdd = () => {
    setCarToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (car) => {
    setCarToEdit(car);
    setShowModal(true);
  };

  // --- FUNÇÃO DE DELETAR ATUALIZADA ---
  const handleDelete = (id) => {
    // Abre o modal de confirmação em vez do window.confirm
    setCarToDelete(id);
  };
  
  // --- NOVA FUNÇÃO PARA EXECUTAR A EXCLUSÃO ---
  const executeDelete = () => {
    if (carToDelete) {
      setCars(cars.filter(c => c.id !== carToDelete));
      setCarToDelete(null); // Fecha o modal
    }
  };


  // --- Funções de Navegação e Autenticação ---
  
  const navigate = (targetPage) => {
    setPage(targetPage);
    setMenuOpen(false); // Fecha o menu mobile ao navegar
  };
  
  const handleLoginSuccess = () => {
    sessionStorage.setItem('jetbalbek_admin_user', 'jetbalbek'); // Salva na sessão
    setIsAdmin(true);
    setShowLoginPage(false);
    setPage('allCars'); // Redireciona para o estoque
    window.history.pushState({}, '', '/'); // Limpa a URL
  };
  
  const handleLogout = () => {
    sessionStorage.removeItem('jetbalbek_admin_user'); // Limpa a sessão
    setIsAdmin(false);
    setPage('home'); // Volta pra home
    setMenuOpen(false);
  };


  // --- Renderização Principal ---

  // Se for para mostrar o login, renderiza SÓ o login
  if (showLoginPage) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }
  
  // Se não, renderiza o site normal
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <Car size={32} color="#fff" />
            <span style={styles.logoText}>JET BALBEK</span>
          </div>
          
          <button 
            style={styles.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav style={{...styles.nav, ...(menuOpen ? styles.navOpen : {})}}>
            <a onClick={() => navigate('home')} style={styles.navLink}>Início</a>
            <a onClick={() => navigate('allCars')} style={styles.navLink}>Ver Estoque</a>
            <a onClick={() => { navigate('home'); window.location.hash = '#sobre'; }} style={styles.navLink}>Sobre</a>
            <a onClick={() => { navigate('home'); window.location.hash = '#contato'; }} style={styles.navLink}>Contato</a>
            
            {/* Botão de Admin Trocado por "Sair" */}
            {isAdmin && (
              <button onClick={handleLogout} style={styles.adminLogoutButton}>
                Sair <LogOut size={16} />
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Renderização da Página Atual */}
      <main style={{marginTop: '70px'}}>
        {page === 'home' && (
          <HomePage 
            // Props atualizadas. Passando 'navigate'
            navigate={navigate}
            // Props removidas:
            // featuredCars={cars.slice(0, 3)}
            // isAdmin={isAdmin}
            // onEdit={handleEdit}
            // onDelete={handleDelete}
          />
        )}
        
        {page === 'allCars' && (
          <AllCarsPage 
            cars={cars}
            isAdmin={isAdmin}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      {/* Modal de Admin (só mostra se showModal for true) */}
      {showModal && (
        <AdminModal 
          car={carToEdit}
          onClose={() => setShowModal(false)}
          onSave={handleSaveCar}
        />
      )}
      
      {/* NOVO: Modal de Confirmação (só mostra se carToDelete não for null) */}
      {carToDelete && (
        <ConfirmModal
          title="Confirmar Exclusão"
          message="Tem certeza que deseja excluir este carro? Esta ação não pode ser desfeita."
          onConfirm={executeDelete}
          onCancel={() => setCarToDelete(null)}
        />
      )}
    </div>
  );
};

// --- ESTILOS (ADICIONEI NOVOS ESTILOS NO FINAL) ---
const styles = {
  // ... (Estilos originais do seu arquivo)
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    margin: 0,
    padding: 0,
    color: '#333',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: '1rem 0',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '2px',
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  navOpen: {
    display: 'flex',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  hero: {
    height: '600px',
    backgroundImage: 'url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&h=900&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroContent: {
    position: 'relative',
    textAlign: 'center',
    color: '#fff',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    letterSpacing: '4px',
  },
  heroSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    fontWeight: '300',
  },
  heroButton: {
    display: 'inline-block',
    padding: '1rem 3rem',
    backgroundColor: '#c41e3a',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    cursor: 'pointer',
  },
  benefitsSection: {
    padding: '5rem 2rem',
    backgroundColor: '#f8f9fa',
  },
  benefitsGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  benefitCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
  },
  benefitIcon: {
    color: '#c41e3a',
    marginBottom: '1rem',
  },
  benefitTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  benefitDescription: {
    color: '#666',
    lineHeight: '1.6',
  },
  carsSection: {
    padding: '5rem 2rem',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '3rem',
    color: '#1a1a1a',
  },
  carouselContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
  },
  carouselSlide: {
    overflow: 'hidden',
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    position: 'relative', // Para os botões de admin
  },
  carImage: {
    width: '100%',
    height: 'auto', // Ajustado para auto
    aspectRatio: '4 / 3', // Proporção da imagem
    objectFit: 'cover',
  },
  carInfo: {
    padding: '2rem',
  },
  carName: {
    fontSize: '1.8rem',
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  carDetails: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  carDetail: {
    color: '#666',
    fontSize: '0.95rem',
  },
  carFeatures: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  carFeature: {
    backgroundColor: '#f0f0f0',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.85rem',
    color: '#555',
  },
  carPrice: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#c41e3a',
    marginBottom: '1.5rem',
  },
  carButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#c41e3a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  carouselButton: {
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'background-color 0.3s',
  },
  carouselButtonLeft: {
    left: '-25px',
  },
  carouselButtonRight: {
    right: '-25px',
  },
  carouselDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '2rem',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  dotActive: {
    backgroundColor: '#c41e3a',
  },
  aboutSection: {
    padding: '5rem 2rem',
    backgroundColor: '#f8f9fa',
  },
  aboutContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  aboutTitle: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#1a1a1a',
  },
  aboutText: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#666',
    marginBottom: '1.5rem',
  },
  contactSection: {
    padding: '5rem 2rem',
    backgroundColor: '#fff',
  },
  locationsGrid: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  },
  locationCard: {
    backgroundColor: '#f8f9fa',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  locationTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#1a1a1a',
  },
  locationInfo: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    alignItems: 'flex-start',
  },
  locationText: {
    color: '#666',
    lineHeight: '1.6',
    margin: 0,
  },
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '3rem 2rem 1rem',
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  footerLogoText: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  footerTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  footerText: {
    color: '#ccc',
    fontSize: '0.95rem',
    margin: 0,
  },
  footerInfo: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  footerBottom: {
    maxWidth: '1200px',
    margin: '0 auto',
    borderTop: '1px solid #333',
    paddingTop: '2rem',
    textAlign: 'center',
  },
  footerBottomText: {
    color: '#ccc',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  footerDisclaimer: {
    color: '#999',
    fontSize: '0.8rem',
    lineHeight: '1.5',
  },

  // --- NOVOS ESTILOS ADICIONADOS ---
  
  adminLogoutButton: {
    background: 'none',
    border: '1px solid #c41e3a',
    color: '#c41e3a',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  emptyStock: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
    padding: '3rem 0',
  },

  // Estilos da Página "Todos os Carros"
  allCarsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  allCarsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: '#c41e3a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  allCarsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },

  // Estilos dos Botões de Admin no Card
  adminButtonContainer: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 5,
    display: 'flex',
    gap: '0.5rem',
  },
  adminButtonEdit: {
    backgroundColor: 'rgba(0, 0, 255, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminButtonDelete: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Estilos do Modal
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1001,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  modalInput: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box', // Importante para o padding não quebrar o layout
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  modalButtonPrimary: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#c41e3a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  modalButtonSecondary: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  
  // --- NOVOS ESTILOS PARA MODAL DE CONFIRMAÇÃO ---
  confirmHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  confirmTitle: {
    fontSize: '1.5rem',
    color: '#1a1a1a',
    margin: 0,
  },
  confirmMessage: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  
  // --- NOVOS ESTILOS PARA PÁGINA DE LOGIN ---
  loginPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
  loginBox: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '2rem',
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  loginInputGroup: {
    position: 'relative',
  },
  loginIcon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '1rem',
    color: '#999',
  },
  loginInput: {
    width: '100%',
    padding: '1rem 1rem 1rem 3rem', // Espaço para o ícone
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxSizing: 'border-box',
  },
  loginButton: {
    padding: '1rem',
    backgroundColor: '#c41e3a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loginError: {
    color: '#c41e3a',
    fontSize: '0.9rem',
    margin: '-0.5rem 0 0 0',
  },


  // Media Queries
  '@media (max-width: 768px)': {
    menuButton: {
      display: 'block',
      zIndex: 1003, // Para ficar acima do menu
    },
    nav: {
      display: 'none',
      position: 'absolute',
      top: 0, // Começa do topo
      left: 0,
      right: 0,
      backgroundColor: '#1a1a1a',
      flexDirection: 'column',
      padding: '5rem 1rem 2rem', // Padding no topo para o logo/botão
      gap: '1.5rem',
      minHeight: '100vh',
      alignItems: 'center',
    },
    navOpen: {
      display: 'flex', // Só é exibido quando menuOpen é true
    },
    adminLogoutButton: {
      color: 'white',
      borderColor: 'white',
    },
    heroTitle: {
      fontSize: '2.5rem',
    },
    heroSubtitle: {
      fontSize: '1.2rem',
    },
    carouselButton: {
      display: 'none', // Esconde setas do carrossel no mobile
    },
    allCarsGrid: {
      gridTemplateColumns: '1fr', // Uma coluna no mobile
    },
    allCarsHeader: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    sectionTitle: {
      fontSize: '2rem',
    },
    loginBox: {
      width: '90%',
      padding: '2rem',
    }
  },
};

// Add hover effects via style
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  a[style*="color: rgb(255, 255, 255)"]:hover {
    color: #c41e3a !important;
  }
  button[style*="background-color: rgb(196, 30, 58)"]:hover {
    background-color: #a01830 !important;
  }
  div[style*="transition: transform"]:hover {
    transform: translateY(-5px);
  }
  button[style*="border-color: rgb(196, 30, 58)"]:hover {
    background-color: #c41e3a !important;
    color: white !important;
  }
  @media (max-width: 768px) {
    button[style*="border-color: rgb(255, 255, 255)"]:hover {
      background-color: #c41e3a !important;
      border-color: #c41e3a !important;
      color: white !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default JetBalbekWebsite;