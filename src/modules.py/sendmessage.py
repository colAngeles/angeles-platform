import yagmail
import random, string

def genToken():
    a = random.choice(string.ascii_uppercase)
    n = random.choice(string.ascii_letters)
    g = random.choice(string.ascii_letters)
    e = random.choice(string.ascii_letters)
    l = random.choice(string.ascii_lowercase)
    x = random.choice(string.ascii_letters)
    s = random.choice(string.ascii_letters)
    s = random.choice(string.digits)
    return a + n + g + e + l + x + s

yag = yagmail.SMTP(user="matriculas@colegiolosangelestunja.com", password="zofczrflfjlsgyfq")

def send(yag, name, toemail, token):
        try:
            yag.send(to=f"{toemail}", subject="Token de validación Colegio Los Ángeles Python", 
                        contents=f'''
                        ¡Cordial saludo señor(a) {name}!

                        Queremos confirmarle los datos que le permitirán acceder a la plataforma de matriculas.
                        
                        <b>Token:</b> <b style="color: #f7901e;">{token}</b>
                        
                        <a href="www.avcla.com">Aula Virtual Colegio Los Ángeles</a>
                        
                        Si tiene algún problema a la hora de acceder a la plataforma, puede escribir al correo duvanmotavita@colegiolosangelestunja.com o al número de <a style="color: #f7901e;" href="wa.me//+573228317980">WhatsApp</a>
                        
                        Cordialmente, 

                        Duván Motavita Pérez
                        Software Developer, Colegio Los Ángeles.
                        
                        ''')
            print(token, end="")
        except:
            print('error:email', end="")

data = "Test duvanmotavita@colegiolosangelestunja.com"
data = data.split(" ")
token = genToken()
send(yag, data[0], data[1], token)