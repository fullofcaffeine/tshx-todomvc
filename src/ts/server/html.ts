// SSR sample, see: https://medium.com/atticus-engineering/server-side-rendering-with-react-and-typescript-8cebb4400b3c
import * as ejs from 'ejs';

const html = ({ body }: { body: string }) => ejs.renderFile(__dirname + '../../views/page.ejs');

export default html;
