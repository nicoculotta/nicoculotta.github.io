const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    let iconNote = document.querySelectorAll('.icon-note');
    let iconLink = document.querySelectorAll('.icon-link');
    let iconTrash = document.querySelectorAll('.icon-trash');
    
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); 
      
        for (let i = 0; i < iconNote.length; i++) {
            iconNote[i].src = 'assets/file-text-outline_dark.svg'
            iconLink[i].src = 'assets/link-2-outline_dark.svg'
            iconTrash[i].src = 'assets/trash-2-outline_dark.svg'
        }
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light');
        for (let i = 0; i < iconNote.length; i++) {
            iconNote[i].src = 'assets/file-text-outline.svg'
        }
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

