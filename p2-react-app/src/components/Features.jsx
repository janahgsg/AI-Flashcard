import '../styles/Features.css'

const Features = () => {
  return (
    <div className="features">

        <div className="features-content">
            <h2>AI Flash makes learning easy</h2>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <h3>AI-Generated Content</h3>
                    <p>Our advanced AI creates high-quality flashcards tailored to your subject, difficulty level, and learning objectives. No more spending hours creating study materials.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h3>Adaptive Learning</h3>
                    <p>Smart algorithms track your progress and adjust question difficulty in real-time, ensuring you're always challenged at the right level.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Progress Analytics</h3>
                    <p>Comprehensive stats track your learning journey with detailed insights into your strengths, weaknesses, and improvement areas.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🌐</div>
                    <h3>Multi-Language Support</h3>
                    <p>Study in your preferred language with support for English, Filipino, Spanish, French, and many more languages worldwide.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h3>Study Anywhere</h3>
                    <p>Responsive design ensures perfect functionality across all devices. Study on your phone, tablet, or computer with seamless synchronization.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Instant Generation</h3>
                    <p>Generate 5-25 flashcards in seconds. Just specify your topic, difficulty, and preferences, and let our AI do the heavy lifting.</p>
                </div>
            </div>
        
        </div>

    </div>
  )
}

export default Features