// wszystkie interaktywne obiekty (z wyj�tkiem tych, poruszanych wy��cznie za pomoc� fizyki)
// powinny rozszerza� klas� MonoBehaviour - daje to dost�p do pewnych podstawowych w�asno�ci
// jak np. po�o�enie i orientacja obiektu w przestrzeni

/* ===========================================================
	klasa opisuj�ca sze�cian poruszaj�cy si� w g�r� i w d�
*/
class CubeMoverScript extends MonoBehaviour
{
	// zmienne nieoznaczone jako prywatne s� dost�pne w edytorze po prawej stronie 
	// (gdy skrypt jest przypisany do obiektu)
	// szybko�� - okre�la warto�� (np. w m/s)
	var speed : float;
	
	// okre�la kierunek, w kt�rym porusza si� cube
	var velocity : Vector3;
	
	
	// ta funkcja wywo�ywana jest tylko raz, kiedy skrypt jest przypisywany do obiektu
	// tutaj warto ustawi� wszystkie warunki pocz�tkowe
	function Start()
	{		
		speed = 5;
	
		// w Unity o� Y jest umieszczona w pionie
		velocity = Vector3(0, 1, 0);
	}
	
	
	// w tej funkcji poowinien by� kod, kt�ry zawiera zmian� stanu obiektu (np. przemieszczanie si�/obr�t)
	function Update()
	{		
		// transform to obiekt przechowuj�cy dane o po�o�eniu ( position ) i orientacji ( rotation )
		// deltaTime to czas od ostatniego update'u (mamy np. 10 m/s a nie min�a sekunda, to musimy policzy�
		// o ile metr�w przesunie si� np. po p� sekundy, czyli np. 0.5 s * 10 m/s
		transform.position += velocity * speed * Time.deltaTime * Mathf.Sin(Time.realtimeSinceStartup);
	}
}