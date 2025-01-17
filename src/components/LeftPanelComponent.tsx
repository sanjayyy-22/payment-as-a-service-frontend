import { BarChart3, CreditCard, Shield } from 'lucide-react';

const LeftPanel = () => {
  const features = [
    {
      title: 'Global Payment Solutions',
      desc: 'Accept payments in 135+ currencies with real-time conversion',
      icon: <CreditCard className='w-6 h-6' />,
      highlight: '98.7% success rate',
    },
    {
      title: 'Enterprise-Grade Security',
      desc: 'PCI DSS Level 1 compliant with end-to-end encryption',
      icon: <Shield className='w-6 h-6' />,
      highlight: 'Military-grade protection',
    },
    {
      title: 'Smart Analytics Dashboard',
      desc: 'Real-time insights and predictive analytics',
      icon: <BarChart3 className='w-6 h-6' />,
      highlight: '15+ visualization tools',
    },
  ];

  const stats = [
    { label: 'Transaction Volume', value: '$2.5B+' },
    { label: 'Global Merchants', value: '50,000+' },
    { label: 'Countries Served', value: '120+' },
    { label: 'Uptime SLA', value: '99.99%' },
  ];

  return (
    <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-b from-blue-50 to-blue-100 p-12 flex-col justify-between overflow-y-auto min-h-screen'>
      <div className='space-y-12'>
        {/* Brand Section */}
        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <CreditCard className='w-8 h-8 text-blue-600' />
            <h1 className='text-4xl font-bold text-gray-900'>PayFlow</h1>
          </div>
          <p className='text-xl text-gray-600'>
            Where Innovation Meets Transaction
          </p>
          <p className='text-sm text-gray-500 max-w-md'>
            Join thousands of businesses that trust PayFlow for their payment
            processing needs. Experience the future of payments today.
          </p>
        </div>

        {/* Features Section */}
        <div className='space-y-6'>
          {features.map((feature, idx) => (
            <div
              key={feature.title + idx}
              className='group bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100'
            >
              <div className='flex items-start space-x-4'>
                <div className='bg-blue-100 p-3 rounded-lg text-blue-600'>
                  {feature.icon}
                </div>
                <div className='space-y-2 flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.desc}</p>
                  <span className='inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium'>
                    {feature.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 gap-6'>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className='text-center bg-white/60 backdrop-blur-sm rounded-lg p-4 hover:bg-white/70 transition-colors duration-300'
            >
              <div className='text-2xl font-bold text-blue-600'>
                {stat.value}
              </div>
              <div className='text-sm text-gray-600'>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className='flex flex-col items-center space-y-4 pt-8 border-t border-gray-200'>
          <p className='text-sm text-gray-600 font-medium'>
            Trusted by Industry Leaders
          </p>
          <div className='flex flex-wrap justify-center gap-6'>
            <div className='flex items-center space-x-2'>
              <Shield className='w-4 h-4 text-gray-400' />
              <span className='text-gray-400 text-xs'>ISO 27001 Certified</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Shield className='w-4 h-4 text-gray-400' />
              <span className='text-gray-400 text-xs'>SOC 2 Type II</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Shield className='w-4 h-4 text-gray-400' />
              <span className='text-gray-400 text-xs'>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='text-center text-sm text-gray-500 mt-8'>
        <p>© 2024 PayFlow. All rights reserved.</p>
        <p className='mt-1'>Secure payments powered by advanced technology</p>
      </div>
    </div>
  );
};

export default LeftPanel;
