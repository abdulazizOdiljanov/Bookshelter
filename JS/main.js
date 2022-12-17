const theme = {
	day: {
		icon: 'fas fa-sun',
		background: '#FFF',
		color: '#CC5D03',
	},
	night: {
		icon: 'fas fa-moon',
		background: '#2C3545',
		color: '#FFF',
	},
};

const change = () => {
	const body = document.body;
	const tgl = document.getElementById('tgl');
	let currentTheme = tgl.className == 'fas fa-moon' ? 'day' : 'night';
	body.style.backgroundColor = theme[currentTheme].background;
	tgl.className = theme[currentTheme].icon;
	tgl.style.color = theme[currentTheme].color;
};
