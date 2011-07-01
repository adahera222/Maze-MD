enum MoveDirection2
	{
		ToStart,
		ToEnd
	}
	


class MovingPlatformScript2 extends MonoBehaviour
{
	// pozycja ko�cowa
	var endPosition : Vector3;

	// zmienne nieoznaczone jako prywatne s� dost�pne w edytorze po prawej stronie 
	// (gdy skrypt jest przypisany do obiektu)
	// szybko�� - okre�la warto�� (np. w m/s)
	var speed : float = 1;
	
	// czas oczekiwania po osi�gni�ciu pozycji pocz�tkowej
	var waitTimeOnStartPosition : float;
	
	// czas oczekiwania po osi�gni�ciu pozycji ko�cowej
	var waitTimeOnEndPosition : float;
	
	//ilo�� wykonywanych ruch�w od - do; -1 niesko�czno��
	var moveTimes : float = -1;
	
	// pozycja pocz�tkowa
	private var startPosition : Vector3;
	
	// okre�la czy poruszamy si� w stron� pozycji pocz�tkowej czy ko�cowej
	private var moveDirection : MoveDirection2 = MoveDirection2.ToEnd;
	
	// okre�la kierunek, w kt�rym porusza si� cube	
	private var velocity : Vector3;	
	
	// okre�la czy oczekujemy na pozycji pocz�tkowej lub ko�cowej
	private var waiting : boolean = false;
		
	private var timeToWait : float = 0;
		
	// czas sp�dzony na czekaniu od ostatniego osi�gni�cia pozycji pocz�tkowej lub ko�cowej
	private var timeSpentWaiting : float = 0;
	
	
	// ta funkcja wywo�ywana jest tylko raz, kiedy skrypt jest przypisywany do obiektu
	// tutaj warto ustawi� wszystkie warunki pocz�tkowe
	function Start()
	{		
		startPosition = transform.position;
		
		velocity = (endPosition - startPosition).normalized;
	}
	
	
	// w tej funkcji poowinien by� kod, kt�ry zawiera zmian� stanu obiektu (np. przemieszczanie si�/obr�t)
	function Update()
	{	
		if (moveTimes != 0 )
		{
			if (waiting)
			{
				timeSpentWaiting += Time.deltaTime;
				
				if (timeToWait - timeSpentWaiting < 0)
					waiting = false;
					
				return;
			}
		
			// osi�gn�li�my pozycj� pocz�tkow�
			if ((transform.position - startPosition).magnitude < 1
				&& moveDirection == MoveDirection2.ToStart)
			{
				waiting = true;
				timeSpentWaiting = 0;
				timeToWait = waitTimeOnStartPosition;
				velocity = -velocity;			
				moveDirection = MoveDirection2.ToEnd;
				moveTimes -= 1;
			}
			// osi�gn�li�my pozycj� ko�cow�
			else if ((transform.position - endPosition).magnitude < 1
				&& moveDirection == MoveDirection2.ToEnd)
			{
				waiting = true;
				timeSpentWaiting = 0;
				timeToWait = waitTimeOnEndPosition;
				velocity = -velocity;
				moveDirection = MoveDirection2.ToStart;
				moveTimes -= 1;
			}
			
			
			// transform to obiekt przechowuj�cy dane o po�o�eniu ( position ) i orientacji ( rotation )
			// deltaTime to czas od ostatniego update'u (mamy np. 10 m/s a nie min�a sekunda, to musimy policzy�
			// o ile metr�w przesunie si� np. po p� sekundy, czyli np. 0.5 s * 10 m/s
			transform.position += velocity * speed * Time.deltaTime;
		}
	}
}