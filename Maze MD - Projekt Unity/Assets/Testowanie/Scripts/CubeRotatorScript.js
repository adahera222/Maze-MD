// wszystkie interaktywne obiekty (z wyj�tkiem tych, poruszanych wy��cznie za pomoc� fizyki)
// powinny rozszerza� klas� MonoBehaviour - daje to dost�p do pewnych podstawowych w�asno�ci
// jak np. po�o�enie i orientacja obiektu w przestrzeni

/* ===========================================================
	klasa opisuj�ca sze�cian obracaj�cy si� wok� osi Y (pionowej)
*/
class CubeRotatorScript extends MonoBehaviour
{
	// zmienne nieoznaczone jako prywatne s� dost�pne w edytorze po prawej stronie 
	// (gdy skrypt jest przypisany do obiektu)
	// szybko�� - okre�la warto�� (np. w m/s)
	var rotationSpeed : float;
	
	
	// ta funkcja wywo�ywana jest tylko raz, kiedy skrypt jest przypisywany do obiektu
	// tutaj warto ustawi� wszystkie warunki pocz�tkowe
	function Start()
	{		
		rotationSpeed = 100;
	}
	
	
	// w tej funkcji poowinien by� kod, kt�ry zawiera zmian� stanu obiektu (np. przemieszczanie si�/obr�t)
	function Update()
	{		
		transform.rotation *= Quaternion.AngleAxis(rotationSpeed*Time.deltaTime, Vector3.up);
	}
}