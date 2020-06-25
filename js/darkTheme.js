const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const ilusContainer = document.querySelector('.ilus-emptyCase')

let img = document.createElement('IMG')
img.src = 'assets/empty_case_animated.svg'
ilusContainer.appendChild(img)

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        img.src = 'assets/empty_case_animated_dark.svg'
        ilusContainer.appendChild(img)
    } else {
        img.src = 'assets/empty_case_animated.svg'
        ilusContainer.appendChild(img)
    }
}

function switchTheme(e) {
    
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); 
        img.src = 'assets/empty_case_animated_dark.svg'

    }
    else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light');
        img.src = 'assets/empty_case_animated.svg'
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

