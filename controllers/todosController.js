const db = require('../config/db.js');


exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query('INSERT INTO todos (title, description) VALUES (?, ?)', [title, description]);
    res.status(201).json({ success: true, message: 'Todo created successfully', data: { id: result.insertId, title, description }});
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// exports.getAllTodos = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM todos');
//     res.status(200).json({ success: true, data: rows });
//   } catch (err) {
//     console.error('Error fetching todos:', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// exports.getAllTodos = async (req, res) => {
//   const { page = 1, limit = 10, search } = req.query;
//   const offset = (page - 1) * limit;

//   try {
//     let query = 'SELECT * FROM todos';
//     let params = [];

//     if (search) {
//       query += ' WHERE title LIKE ? OR description LIKE ?';
//       params.push(`%${search}%`, `%${search}%`);
//     }

//     query += ' LIMIT ? OFFSET ?';
//     params.push(Number(limit), Number(offset));

//     const [rows] = await db.query(query, params);
//     res.status(200).json({ success: true, data: rows });
//   } catch (err) {
//     console.error('Error fetching todos:', err);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };
exports.getAllTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.query(
      `SELECT * FROM todos WHERE title LIKE ? OR description LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?`,
      [`%${search}%`, `%${search}%`, limit, offset]
    );

    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM todos WHERE title LIKE ? OR description LIKE ?`,
      [`%${search}%`, `%${search}%`]
    );

    const total = countResult[0].total;

    res.status(200).json({
      success: true,
      data: rows,
      meta: {
        page,
        limit,
        total,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1
      }
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('Error fetching todo:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
      const [result] = await db.query('UPDATE todos SET title = ?, description = ?,status = ? WHERE id = ?', [title, description, status, id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
      res.status(200).json({ success: true, message: 'Todo updated successfully' });
    } catch (err) {
      console.error('Error updating todo:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Todo not found' });
    }
    res.status(200).json({ success: true, message: 'Todo deleted successfully' });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

exports.getTodoStats = async (req, res) => {
  try {
    const [pending] = await db.query("SELECT COUNT(*) AS count FROM todos WHERE status = 'pending'");
    const [completed] = await db.query("SELECT COUNT(*) AS count FROM todos WHERE status = 'completed'");

    res.status(200).json({
      success: true,
      data: {
        pending: pending[0].count,
        completed: completed[0].count
      }
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};