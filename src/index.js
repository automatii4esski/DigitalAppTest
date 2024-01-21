import './styles/main.scss';
import './assets/fonts/Gilroy-Medium.woff';
require.context('./assets/img', true, /\.(png|jpg|gif)$/i);
require.context('./assets/fonts', true, /\.(woff|woff2)$/i);

import './js/Main';
